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

export function AvatarSkeleton({
  size = "medium",
}: {
  size: "small" | "medium" | "large";
}) {
  return <div className={`${css.avatarSkeleton} ${css.avatarSize[size]}`} />;
}
