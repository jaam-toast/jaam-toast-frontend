import { useQuery } from "@tanstack/react-query";
import { getPageScreenshot } from "../@utils/getPageScreenshot";
import * as css from "./index.css";

export function Preview({ url }: { url: string }) {
  const { data: previwImageSrc } = useQuery({
    queryKey: ["preview", url],
    queryFn: () => getPageScreenshot(url),
  });

  return (
    <div className={css.preview}>
      <a href={url} className={css.previewFilter} target="_blank">
        <img
          alt="jaam-toast-preview"
          src={previwImageSrc ?? ""}
          className={css.previewImage}
          title="it's your site! yeah!"
        />
      </a>
    </div>
  );
}

export function PreviewSkeleton() {
  return <div className={css.previewSkeleton} />;
}
