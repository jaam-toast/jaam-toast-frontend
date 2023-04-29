import { create } from "zustand";
import { shallow } from "zustand/shallow";
import {
  JsonSchema,
  JaamSchema,
  JaamSchemaProperties,
  jsonSchemaToJaamSchema,
} from "@jaam-schema/src";

type Property = {
  originalNameForEditing: string;
  name: string;
  options: JaamSchemaProperties;
};

type SchemaState = {
  title: string;
  description?: string;
  type: string;
  properties: JaamSchema["properties"];
  currentEditProperty: Property;
};

type SchemaStore = SchemaState & {
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
    addProperty: () => void;
    editProperty: () => void;
    deleteProperty: ({ propertyName }: { propertyName: string }) => void;
    reset: () => void;
  };
};

const initialState: SchemaState = {
  title: "",
  description: "",
  type: "object",
  properties: {},
  currentEditProperty: {
    originalNameForEditing: "",
    name: "",
    options: { type: "text" },
  },
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

          set(state => ({
            currentEditProperty: {
              ...state.currentEditProperty,
              name: name !== undefined ? name : state.currentEditProperty.name,
              options,
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
      const { originalNameForEditing, name, options } =
        get().currentEditProperty;

      if (name !== originalNameForEditing) {
        delete updatedProperties[originalNameForEditing];
      }

      set(state => ({
        properties: {
          ...state.properties,
          [name]: options,
        },
      }));
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

export const useCurrentEditProperty = () =>
  useSchemaStore(state => state.currentEditProperty);

export const useSetSchemaState = () => useSchemaStore(state => state.actions);
