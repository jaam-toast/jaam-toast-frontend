import * as css from "./Avatar.css";

export function Avatar({
  children,
  size = "medium",
}: {
  children: JSX.Element;
  size?: "small" | "medium" | "large";
}) {
  return (
    <div className={`${css.container} ${css.avatarSize[size]}`}>{children}</div>
  );
}
