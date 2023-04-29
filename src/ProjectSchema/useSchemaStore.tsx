import { create } from "zustand";
import {
  JsonSchema,
  JaamSchema,
  JaamSchemaPropertyType,
} from "../@packages/jaam-schema/src";
import { shallow } from "zustand/shallow";

type PropertyOptions = {
  min?: number;
  max?: number;
  required?: boolean;
};

type Property = {
  name: string;
  type: JaamSchemaPropertyType;
  options: PropertyOptions;
};

type SchemaStore = {
  title: string;
  description?: string;
  type: string;
  properties: JaamSchema["properties"];
  required: string[];
  currentEditProperty: Property;

  actions: {
    setState: (schema: JsonSchema) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setCurrentEditProperty: ({
      type,
      updateData,
      propertyName,
    }: {
      type: "set" | "update" | "reset";
      updateData?: Property;
      propertyName?: string;
    }) => void;
    addProperty: (field: Property) => void;
    editProperty: ({
      targetTitle,
      updateField,
    }: {
      targetTitle: string;
      updateField: Property;
    }) => void;
    deleteProperty: ({ propertyName }: { propertyName: string }) => void;
    reset: () => void;
  };
};

const initialState = {
  title: "",
  description: "",
  type: "object",
  properties: {} as JaamSchema["properties"],
  required: [],
  currentEditProperty: {
    name: "",
    type: "text",
    options: {},
  } as Property,
};

export const useSchemaStore = create<SchemaStore>((set, get) => ({
  ...initialState,

  actions: {
    setState: (schema: JsonSchema) => {
      const prop = Object.entries(schema.properties).reduce(
        (propertyObj, [name, data]) => {
          const {
            type,
            format,
            description,
            minLength,
            maxLength,
            minimum,
            maximum,
          } = data;
          const formattedType = (() => {
            if (format) {
              if (format === "uri-template") {
                return "link";
              }
              return format;
            }

            if (description) {
              return description;
            }

            return type;
          })() as JaamSchemaPropertyType;

          propertyObj[name] = {
            type: formattedType,
            ...((minLength !== undefined || minimum !== undefined) && {
              min: minLength || minimum,
            }),
            ...((maxLength !== undefined || maximum !== undefined) && {
              max: maxLength || maximum,
            }),
          };

          return propertyObj;
        },
        {} as JaamSchema["properties"],
      );

      set({
        title: schema.title,
        type: "object",
        properties: prop,
        ...(schema.description && { description: schema.description }),
        ...(schema.required && { required: schema.required }),
      });
    },
    setTitle: (title: string) => {
      set({ title });
    },
    setDescription: (description: string) => {
      set({ description });
    },
    // set update reset
    setCurrentEditProperty: ({ type, updateData, propertyName }) => {
      switch (type) {
        case "set": {
          if (!propertyName) {
            return;
          }

          const { min, max } = get().properties[propertyName];
          set(state => ({
            currentEditProperty: {
              name: propertyName,
              type: state.properties[propertyName].type,
              options: {
                ...(min && { min }),
                ...(max && { max }),
                ...(state.required &&
                  state.required.includes(propertyName) && { required: true }),
              },
            },
          }));

          return;
        }
        case "update": {
          if (!updateData) {
            return;
          }

          set({
            currentEditProperty: updateData,
          });

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
    addProperty: (property: Property) => {
      const { name, type, options } = property;

      if (options.required) {
        set(state => ({ required: [...state.required, property.name] }));
      }

      set(state => ({
        properties: {
          ...state.properties,
          [name]: {
            type,
            ...(options.min && { min: options.min }),
            ...(options.max && { max: options.max }),
          },
        },
      }));
    },
    editProperty: ({ targetTitle, updateField }) => {
      if (updateField.options.required) {
        if (targetTitle !== updateField.name) {
          set(state => ({
            required: state.required.includes(targetTitle)
              ? state.required.map(title =>
                  title === targetTitle ? updateField.name : title,
                )
              : [...state.required, updateField.name],
          }));
        }

        if (targetTitle === updateField.name) {
          set(state => ({
            required: state.required.includes(targetTitle)
              ? state.required
              : [...state.required, updateField.name],
          }));
        }
      }

      if (!updateField.options.required) {
        set(state => ({
          required: state.required.filter(title => title !== targetTitle),
        }));
      }

      const newProperties = { ...get().properties };
      delete newProperties[targetTitle];

      newProperties[updateField.name] = {
        type: updateField.type,
        ...(updateField.options.min && { min: updateField.options.min }),
        ...(updateField.options.max && { max: updateField.options.max }),
      };

      set({
        properties: newProperties,
      });
    },
    deleteProperty: ({ propertyName }) => {
      const newProperties = { ...get().properties };
      delete newProperties[propertyName];

      set({ properties: newProperties });
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
      required: state.required,
    }),
    shallow,
  );

export const useCurrentEditProperty = () =>
  useSchemaStore(state => state.currentEditProperty);

export const useSetSchemaState = () => useSchemaStore(state => state.actions);
