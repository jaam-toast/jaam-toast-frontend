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

type ContentsStore = {
  content: JaamSchemaContent;
  contentsErrorMessage: ContentsErrorMessage;

  actions: {
    setContents: <T extends JaamSchemaContentProperty>({
      name,
      content,
      schema,
    }: {
      name: string;
      content: T;
      schema: JsonSchema;
    }) => void;
    reset: () => void;
  };
};

const initialState = {
  schema: null,
  content: {},
  contentsErrorMessage: {},
};

export const useContentsStore = create<ContentsStore>((set, get) => ({
  ...initialState,

  actions: {
    setContents: ({ name, content, schema }) => {
      const jsonSchema = { ...schema };

      if (schema.required) {
        jsonSchema.required = [];
      }

      const { message: errorMessage } = jsonSchemaValidator({
        content: { [name]: content },
        schema,
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
      content: state.content,
      contentsErrorMessage: state.contentsErrorMessage,
    };
  }, shallow);

export const useSetContentsState = () =>
  useContentsStore(state => state.actions);
