import Config from "lib/config";
import axios from "axios";

var regId = /[^a-z|A-Z|0-9]/g;

async function getValidSubDomain(data?: string): Promise<string | undefined> {
  try {
    if (!data) return;

    const unverifiedSubDomain = data.replace(regId, "") as string;

    const result = await axios.get(
      `${Config.HOST_API_URL}/domain-checker/${unverifiedSubDomain}`,
    );

    const { subDomain }: { subDomain: string } = result.data;

    return subDomain;
  } catch (err) {
    console.log(err);
  }

  return;
}

export default getValidSubDomain;
