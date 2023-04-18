import axios from "axios";
import Config from "../@config";

type Response = {
  result: string;
  faviconPath?: string;
};

export async function getPageFavicon(domain: string): Promise<string | null> {
  try {
    const { data } = await axios<Response>({
      method: "GET",
      url: Config.FAVICON_API_URL,
      timeout: 2500,
      params: {
        url: `https://${domain}`,
      },
    });

    return data.result === "ok" ? data.faviconPath! : null;
  } catch (error) {
    throw error;
  }
}
