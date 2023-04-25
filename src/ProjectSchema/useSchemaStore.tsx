import { create } from "zustand";
import { SchemaFieldType, Schema } from "../@types/schema";

type PropertyOptions = {
  min?: number;
  max?: number;
  required?: boolean;
};

type Property = {
  name: string;
  type: SchemaFieldType;
  options: PropertyOptions;
};

type SchemaStore = {
  title: string;
  description?: string;
  type: string;
  properties: Schema["properties"];
  required: string[];
  currentEditProperty: Property;

  actions: {
    setState: (state: Schema) => void;
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
  properties: {},
  required: [],
  currentEditProperty: {
    name: "",
    type: "text",
    options: {},
  },
};

export const useSchemaStore = create<SchemaStore>((set, get) => ({
  ...initialState,

  actions: {
    setState: (state: Schema) => {
      /**
       * 서버에서 가져온 스키마 리스트 수정하기 좋게 가공하는 부분입니다.
       *
       * schema property minLength or minimum 등을 min, max로 통일
       * date, email, link - format에 적혀있는 것 type으로 이동
       * schema type이 string일시 description에 등록된 type으로 변경
       */
      const prop = Object.entries(state.properties).reduce(
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
          })();

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
        {} as Schema["properties"],
      );

      set({
        title: state.title,
        type: "object",
        properties: prop,
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
          console.log({ updateData });
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

export const useCurrentEditProperty = () =>
  useSchemaStore(state => state.currentEditProperty);

export const useSetSchemaState = () => useSchemaStore(state => state.actions);
