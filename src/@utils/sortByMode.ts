import sortBy from "lodash/sortBy";

type Options<T> = {
  mode: "Default" | "Ascending" | "Descending";
  data: T[];
  fieldName?: string;
};

export function sortByMode<T>({ mode, data, fieldName }: Options<T>) {
  switch (mode) {
    case "Default": {
      return data;
    }
    case "Ascending": {
      if (!fieldName) {
        return data;
      }

      return sortBy(data, fieldName);
    }
    case "Descending": {
      if (!fieldName) {
        return data;
      }

      return sortBy(data, fieldName).reverse();
    }
  }
}
