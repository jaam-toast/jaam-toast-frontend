import { create } from "zustand";
import { shallow } from "zustand/shallow";

type CheckboxStore = {
  name: string;
  isAllChecked: boolean;
  values: Set<string>;

  actions: {
    setName: (name: string) => void;
    toggleAllChecked: (allValues: string[]) => void;
    setCheckboxValue: ({
      value,
      checkboxCount,
    }: {
      value: string;
      checkboxCount: number;
    }) => void;
  };
};

const initialState: Omit<CheckboxStore, "actions"> = {
  name: "",
  isAllChecked: false,
  values: new Set<string>(),
};

const useCheckboxStore = create<CheckboxStore>((set, get) => ({
  ...initialState,

  actions: {
    setName: (name: string) => {
      if (get().name === name) {
        return;
      }

      if (get().name && get().name !== name) {
        set({
          name,
          isAllChecked: false,
          values: initialState.values,
        });

        return;
      }

      set({ name });
    },
    toggleAllChecked: (allValues: string[]) =>
      set(state => ({
        values: state.isAllChecked ? new Set() : new Set(allValues),
        isAllChecked: !state.isAllChecked,
      })),
    setCheckboxValue: ({ value, checkboxCount }) => {
      if (get().values.has(value)) {
        const newValues = new Set(get().values);
        newValues.delete(value);

        set({ values: newValues, isAllChecked: false });
      } else {
        set(state => ({
          values: new Set(state.values).add(value),
          isAllChecked: checkboxCount === state.values.size + 1 ? true : false,
        }));
      }
    },
  },
}));

export const useSetCheckboxState = () =>
  useCheckboxStore(state => state.actions);

export const useCheckboxState = () =>
  useCheckboxStore(
    state => ({
      isAllChecked: state.isAllChecked,
      values: state.values,
    }),
    shallow,
  );
