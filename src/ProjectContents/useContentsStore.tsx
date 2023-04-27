import { create } from "zustand";
import {
  JaamSchema,
  JsonSchema,
} from "../@packages/json-schema-to-jaam-schema/types";
import jsonSchemaValidator from "../@packages/json-schema-validator";

import type { Contents, ContentType } from "../@types/cms";

type ContentsErrorMessage = {
  [propertyName in string]: string;
};

type ContentsStore = {
  schema: JsonSchema;
  content: Contents;
  contentsErrorMessage: ContentsErrorMessage;

  actions: {
    setSchema: (schema: JsonSchema) => void;
    setContents: <T extends ContentType>({
      name,
      schema,
      content,
    }: {
      name: string;
      schema: JaamSchema;
      content: T;
    }) => void;
  };
};

const initialState = {
  schema: {} as JsonSchema,
  content: {},
  contentsErrorMessage: {},
};

export const useContentsStore = create<ContentsStore>((set, get) => ({
  ...initialState,

  actions: {
    setSchema: (schema: JsonSchema) => set({ schema }),
    setContents: ({ name, content, schema }) => {
      const jsonSchema = { ...schema };

      if (schema.required) {
        jsonSchema.required = [];
      }

      const { message: errorMessage } = jsonSchemaValidator({
        content: { [name]: content },
        schema: jsonSchema,
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
  },
}));

export const useContentsState = () =>
  useContentsStore(state => {
    return {
      content: state.content,
      contentsError: state.contentsErrorMessage,
    };
  });

export const useSetContentsState = () =>
  useContentsStore(state => state.actions);
