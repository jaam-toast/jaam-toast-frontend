import Cookies from "js-cookie";

import { logout } from "../@utils/api";

export function useAuth() {
  const userId = Cookies.get("userId") || null;

  return {
    userId,
    isLogin: !!userId,
    logout,
  };
}
