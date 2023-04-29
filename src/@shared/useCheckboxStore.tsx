import { create } from "zustand";
import { shallow } from "zustand/shallow";

type CheckboxStore = {
  isAllChecked: boolean;
  values: Set<string>;
  actions: {
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

const useCheckboxStore = create<CheckboxStore>((set, get) => ({
  isAllChecked: false,
  values: new Set<string>(),

  actions: {
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
