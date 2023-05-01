import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { jsonSchemaValidator } from "@jaam-schema/src";

import type {
  JsonSchema,
  JaamSchemaContent,
  JaamSchemaContentProperty,
} from "@jaam-schema/src";

type ContentsErrorMessage = {
  [propertyName in string]: string;
};

type ContentState = {
  currentSchema: JsonSchema;
  content: JaamSchemaContent;
  contentsErrorMessage: ContentsErrorMessage;
};

type ContentsStore = ContentState & {
  actions: {
    setSchema: (schema: JsonSchema) => void;
    setContent: (content: JaamSchemaContent) => void;
    setContentProperty: <T extends JaamSchemaContentProperty>({
      name,
      content,
    }: {
      name: string;
      content: T;
    }) => void;
    reset: () => void;
  };
};

const initialState: ContentState = {
  currentSchema: {
    title: "",
    type: "object",
    properties: {},
    required: [],
  },
  content: {},
  contentsErrorMessage: {},
};

export const useContentsStore = create<ContentsStore>((set, get) => ({
  ...initialState,

  actions: {
    setSchema: schema => {
      set({ currentSchema: schema });
    },
    setContent: content => {
      const copyContent = { ...content };
      delete copyContent._createdAt;
      delete copyContent._updatedAt;
      delete copyContent._id;

      set({ content: copyContent });
    },
    setContentProperty: ({ name, content }) => {
      const jsonSchema = { ...get().currentSchema };

      if (get().currentSchema.required) {
        jsonSchema.required = [];
      }

      const { message: errorMessage } = jsonSchemaValidator({
        content: { [name]: content },
        schema: get().currentSchema,
      });

      set(state => {
        return {
          content: { ...state.content, [name]: content },
          contentsErrorMessage: {
            ...state.contentsErrorMessage,
            [name]: errorMessage || "",
          },
        };
      });
    },
    reset: () => {
      set(initialState);
    },
  },
}));

export const useContentsState = () =>
  useContentsStore(state => {
    return {
      schema: state.currentSchema,
      content: state.content,
      contentsErrorMessage: state.contentsErrorMessage,
    };
  }, shallow);

export const useSetContentsState = () =>
  useContentsStore(state => state.actions);
