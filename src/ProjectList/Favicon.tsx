import { useQuery } from "@tanstack/react-query";

import { getPageFavicon } from "../@utils/getPageFavicon";
import Config from "../@config";
import * as css from "./Favicon.css";

export function Favicon({ domain }: { domain: string }) {
  const { data: faviconUrl } = useQuery({
    queryKey: ["favicon", domain],
    queryFn: () => getPageFavicon(domain),
  });

  return (
    <img
      className={css.avatarIcon}
      src={
        faviconUrl || `${Config.HOST_URL}/images/jaamtoast-favicon-image.png`
      }
    />
  );
}
