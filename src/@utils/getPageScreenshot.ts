import axios from "axios";
import Config from "../@config";

export async function getPageScreenshot(url: string): Promise<string> {
  try {
    const { data } = await axios<Blob>({
      method: "GET",
      url: `//${Config.SCREENSHOT_API_URL}`,
      timeout: 2500,
      params: {
        url,
      },
      responseType: "blob",
    });

    const reader = new FileReader();
    reader.readAsDataURL(data);

    return new Promise(resolve => {
      reader.onloadend = () => {
        const src = reader.result;
        resolve(src as string);
      };
    });
  } catch (error) {
    return "/images/fail-screenshot.png";
  }
}
