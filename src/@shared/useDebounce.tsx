import { useState } from "react";

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay?: number,
) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay || 500);
    clearTimeout(timer);
    setTimer(newTimer);
  }) as Func;

  return debouncedFunction;
}
