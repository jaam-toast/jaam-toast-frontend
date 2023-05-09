import { Link } from "react-router-dom";

import * as css from "./EmptyCard.css";

type EmptyCardProps = {
  title: string;
  description?: string;
  link: string;
  linkTitle: string;
};

export function EmptyCard({
  title,
  description,
  link,
  linkTitle,
}: EmptyCardProps) {
  return (
    <section className={css.emptySection}>
      <span className={css.infoText}>
        <b>{title}</b> <br />
        {description}
      </span>
      <div className={css.emptyButtonWrapper}>
        <Link to={link} className={css.emptyButton}>
          {linkTitle}
        </Link>
      </div>
    </section>
  );
}
