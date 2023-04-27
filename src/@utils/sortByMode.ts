import sortBy from "lodash/sortBy";

type Options<T> = {
  mode: "ascending" | "descending";
  data: T[];
  fieldName?: string;
};

export function sortByMode<T>({ mode, data, fieldName }: Options<T>) {
  switch (mode) {
    case "ascending": {
      if (!fieldName) {
        return data;
      }

      return sortBy(data, fieldName);
    }
    case "descending": {
      if (!fieldName) {
        return data;
      }

      return sortBy(data, fieldName).reverse();
    }
  }
}
