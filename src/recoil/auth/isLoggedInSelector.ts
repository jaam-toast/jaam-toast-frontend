import { selector } from "recoil";

import loginStateAtom from "./atom";

const isLoggedInState = selector({
  key: "isLoggedInState",
  get: ({ get }) => {
    const loginState = get(loginStateAtom);

    return loginState !== null;
  },
});

export default isLoggedInState;
