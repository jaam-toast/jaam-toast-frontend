import Cookies from "js-cookie";

export function useAuth() {
  const user = Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData") as string)
    : null;

  return {
    user,
  };
}
