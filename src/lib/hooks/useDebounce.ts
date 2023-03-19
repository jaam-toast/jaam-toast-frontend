import { useCallback } from "react";

function debounce<Params extends any[]>(func: Function, delay?: number) {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Params) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => func(...args), delay || 500);
  };

  return debounced;
}

function useDebounce(func: Function, delay?: number) {
  return debounce(useCallback(func, [func, delay]), delay);
}

export default useDebounce;
