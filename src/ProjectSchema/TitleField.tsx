import * as css from "./TitleField.css";

export function TitleField({ children }: { children: string }) {
  return (
    <div className={css.fieldTitleBox}>
      <span className={css.fieldTitle}>{children}</span>
    </div>
  );
}
