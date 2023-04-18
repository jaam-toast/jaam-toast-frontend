import { useQuery } from "@tanstack/react-query";

import { getPageFavicon } from "../@utils/getPageFavicon";
import Config from "../@config";
import * as css from "./ProjectCardList.css";

export function FaviconImg({ domain }: { domain: string }) {
  const { data: faviconUrl } = useQuery({
    queryKey: ["favicon", domain],
    queryFn: () => getPageFavicon(domain),
    // TODO: error handling
    onError: (error: unknown) => console.log,
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

export function FaviconImgSkeleton() {
  return <div className={css.avatarIconSkeleton} />;
}
