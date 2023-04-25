import { create } from "zustand";

type CheckboxStore = {
  isAllChecked: boolean;
  values: Set<string>;
  actions: {
    toggleAllChecked: (allValues: string[]) => void;
    setValue: (value: string) => void;
  };
};

const useCheckboxStore = create<CheckboxStore>((set, get) => ({
  isAllChecked: false,
  values: new Set<string>(),

  actions: {
    toggleAllChecked: (allValues: string[]) =>
      set(state => ({
        values: state.isAllChecked ? new Set() : new Set(allValues),
        isAllChecked: !state.isAllChecked,
      })),
    setValue: value => {
      if (get().values.has(value)) {
        const newValues = new Set(get().values);
        newValues.delete(value);

        set({ values: newValues });
      } else {
        set(state => ({
          values: new Set(state.values).add(value),
        }));
      }
    },
  },
}));

export const useSetCheckboxState = () =>
  useCheckboxStore(state => state.actions);

export const useCheckboxState = () =>
  useCheckboxStore(state => ({
    isAllChecked: state.isAllChecked,
    values: state.values,
  }));
