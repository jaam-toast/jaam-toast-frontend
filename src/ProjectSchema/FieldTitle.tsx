import * as css from "./FieldTitle.css";

export function FieldTitle({ children }: { children: string }) {
  return (
    <div className={css.fieldTitleBox}>
      <span className={css.fieldTitle}>{children}</span>
    </div>
  );
}
