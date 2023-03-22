import type { NextApiRequest, NextApiResponse } from "next";
import whoiser, { WhoisSearchResult } from "whoiser";
import crypto from "crypto";

type Response = {
  subDomain?: string;
  message?: string;
};

interface Who extends WhoisSearchResult {
  [index: string]: string | WhoisSearchResult | string[];
  result: WhoisSearchResult;
  text: { [index: number]: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  try {
    const { repositoryName } = req.query;
    const jaamToastName = "jaamtoast.click";

    let isUseDomain = true;
    let subDomain = repositoryName as string;
    let domain = `${subDomain}.${jaamToastName}`;

    while (isUseDomain && repositoryName) {
      const domainData = await whoiser(domain);

      const result = (
        (domainData["whois.nic.click"] as Who["result"]).text as Who["text"]
      )[0];

      if (result.includes("is available for registration")) {
        isUseDomain = false;

        break;
      }

      const randomValue = crypto.randomUUID().slice(0, 8);
      subDomain = `${repositoryName}-${randomValue}`;
      domain = `${subDomain}-${jaamToastName}`;
    }

    res.status(200).json({ subDomain });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad Request" });
  }
}
