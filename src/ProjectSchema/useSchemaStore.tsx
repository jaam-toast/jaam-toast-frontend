import { create } from "zustand";
import { SchemaFieldType, Schema } from "../@types/schema";

type Options = {
  min?: number;
  max?: number;
  required?: boolean;
};

type Property = {
  name: string;
  type: SchemaFieldType;
  options: Options;
};

type SchemaStore = {
  title: string;
  description?: string;
  type: string;
  properties: Schema["properties"];
  required: string[];

  actions: {
    setState: (state: Schema) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
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

export const useSchemaStore = create<SchemaStore>((set, get) => ({
  title: "",
  description: "",
  type: "object",
  properties: {},
  required: [],

  actions: {
    setState: (state: Schema) => {
      set({
        title: state.title,
        type: "object",
        properties: state.properties,
        ...(state.description && { description: state.description }),
        ...(state.required && { required: state.required }),
      });
    },
    setTitle: (title: string) => {
      set({ title });
    },
    setDescription: (description: string) => {
      set({ description });
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
      set({
        title: "",
        description: "",
        type: "object",
        properties: {},
        required: [],
      });
    },
  },
}));

export const useSchemaState = (): Schema =>
  useSchemaStore(state => ({
    title: state.title,
    description: state.description,
    type: "object",
    properties: state.properties,
    required: state.required,
  }));

export const useSetSchemaState = () => useSchemaStore(state => state.actions);
