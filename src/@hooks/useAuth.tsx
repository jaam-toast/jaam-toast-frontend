import Cookies from "js-cookie";

import { logout } from "../@utils/api";

export function useAuth() {
  const user = Cookies.get("userId") || null;

  return {
    user,
    isLogin: !!user,
    logout,
  };
}
