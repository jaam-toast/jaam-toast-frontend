import { atom } from "recoil";
import { getCookie } from "cookies-next";

import { UserLoginData } from "../../../types";

type LoginData = {
  data: UserLoginData;
  accessToken: string;
};

const loginState = atom<LoginData | null>({
  key: "loginState",
  default: getCookie("loginData")
    ? (JSON.parse(getCookie("loginData") as string) as LoginData)
    : null,
});

export default loginState;
