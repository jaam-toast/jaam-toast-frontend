import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { jsonSchemaToJaamSchema } from "@jaam-schema/src";

import type {
  JsonSchema,
  JaamSchema,
  JaamSchemaProperties,
} from "@jaam-schema/src";

type Property = {
  originalNameForEditing: string;
  name: string;
  warningMessage?: string;
  options: JaamSchemaProperties;
};

type SchemaStore = {
  title: string;
  description?: string;
  type: string;
  properties: JaamSchema["properties"];
  currentEditProperty: Property;
  isSchemaChanged: boolean;

  actions: {
    setSchema: (schema: JsonSchema) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setCurrentEditProperty: ({
      type,
      updateData,
      propertyName,
    }: {
      type: "set" | "update" | "reset";
      updateData?: Exclude<Property, "originalNameForEditing">;
      propertyName?: string;
    }) => void;
    setIsSchemaChanged: () => void;
    addProperty: () => void;
    editProperty: () => void;
    deleteProperty: ({ propertyName }: { propertyName: string }) => void;
    reset: () => void;
  };
};

const initialState: Omit<SchemaStore, "actions"> = {
  title: "",
  description: "",
  type: "object",
  properties: {},
  currentEditProperty: {
    originalNameForEditing: "",
    name: "",
    options: { type: "text" },
    warningMessage: "",
  },
  isSchemaChanged: false,
};

export const useSchemaStore = create<SchemaStore>((set, get) => ({
  ...initialState,

  actions: {
    setSchema: (schema: JsonSchema) => {
      const jaamSchema = jsonSchemaToJaamSchema(schema);

      set({
        title: jaamSchema.title,
        type: "object",
        properties: jaamSchema.properties,
        ...(jaamSchema.description && { description: jaamSchema.description }),
      });
    },
    setTitle: (title: string) => {
      set({ title });
    },
    setDescription: (description: string) => {
      set({ description });
    },
    setCurrentEditProperty: ({ type, updateData, propertyName }) => {
      switch (type) {
        case "set": {
          if (!propertyName) {
            return;
          }

          set(state => ({
            currentEditProperty: {
              originalNameForEditing: propertyName,
              name: propertyName,
              options: state.properties[propertyName],
            },
          }));

          return;
        }
        case "update": {
          if (!updateData) {
            return;
          }

          const { options, name } = updateData;

          const validateRegex = /^[a-zA-Z\s-]*$/;

          const createValidateMessage = (text: string) => {
            if (!validateRegex.test(text)) {
              return "You can only enter English lowercase and uppercase letters and ' - '";
            }

            if (
              get().currentEditProperty.originalNameForEditing !==
                get().currentEditProperty.name &&
              Object.keys(get().properties).includes(text)
            ) {
              return "Your Property name is duplicated.";
            }

            return "";
          };

          set(state => ({
            currentEditProperty: {
              ...state.currentEditProperty,
              name: name !== undefined ? name : state.currentEditProperty.name,
              options,
              warningMessage: createValidateMessage(name),
            },
          }));

          return;
        }
        case "reset": {
          set({ currentEditProperty: initialState.currentEditProperty });

          return;
        }
        default: {
          return;
        }
      }
    },
    setIsSchemaChanged: () => {
      set(state => ({ isSchemaChanged: !state.isSchemaChanged }));
    },
    addProperty: () => {
      const { options, name } = get().currentEditProperty;

      set(state => ({
        properties: {
          ...state.properties,
          [name]: { ...options, type: options?.type || "text" },
        },
      }));
      set({ currentEditProperty: initialState.currentEditProperty });
    },
    editProperty: () => {
      const updatedProperties = { ...get().properties };
      console.log("1", updatedProperties);
      const { originalNameForEditing, name, options } =
        get().currentEditProperty;

      if (name !== originalNameForEditing) {
        delete updatedProperties[originalNameForEditing];
      }

      set({
        properties: {
          ...updatedProperties,
          [name]: options,
        },
      });
      set({ currentEditProperty: initialState.currentEditProperty });
    },
    deleteProperty: ({ propertyName }) => {
      const updatedProperties = { ...get().properties };
      delete updatedProperties[propertyName];

      set({ properties: updatedProperties });
    },
    reset: () => {
      set(initialState);
    },
  },
}));

export const useSchemaState = (): JaamSchema =>
  useSchemaStore(
    state => ({
      title: state.title,
      type: "object",
      description: state.description,
      properties: state.properties,
    }),
    shallow,
  );

export const useIsSchemaChanged = () =>
  useSchemaStore(state => state.isSchemaChanged);

export const useCurrentEditProperty = () =>
  useSchemaStore(state => state.currentEditProperty);

export const useSetSchemaState = () => useSchemaStore(state => state.actions);
