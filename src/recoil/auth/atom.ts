import { atom } from "recoil";
import { getCookie } from "cookies-next";

import { LoginData } from "types/auth";

const loginState = atom<LoginData | null>({
  key: "loginState",
  default: null,
});

export default loginState;
