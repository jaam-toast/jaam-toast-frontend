import { getCookie } from "cookies-next";

import type { IncomingMessage, ServerResponse } from "http";
import type { User } from "types/auth";

type NextJsRequestResponse = {
  res: ServerResponse;
  req: IncomingMessage & {
    cookies?:
      | {
          [key: string]: string;
        }
      | Partial<{
          [key: string]: string;
        }>;
  };
};

function getUserFromCookie({ req, res }: NextJsRequestResponse): User | null {
  const loginCookieData = getCookie("loginData", { req, res });

  return typeof loginCookieData === "string"
    ? JSON.parse(loginCookieData)
    : null;
}

export default getUserFromCookie;
