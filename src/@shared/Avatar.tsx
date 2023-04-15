import * as css from "./Avatar.css";

export function Avatar({
  children,
  size = "medium",
  className = "",
}: {
  children: JSX.Element;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  return (
    <div
      className={`${css.container} ${css.avatarSize[size]} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function AvatarSkeleton({
  size = "medium",
  className = "",
}: {
  size: "small" | "medium" | "large";
  className?: string;
}) {
  return (
    <div
      className={`${css.avatarSkeleton} ${css.avatarSize[size]} ${
        className ?? ""
      }`}
    />
  );
}
