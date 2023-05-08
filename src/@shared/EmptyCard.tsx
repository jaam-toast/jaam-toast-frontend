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
    <section className={css.emptyCmsSection}>
      <span className={css.infoText}>
        <strong>{title}</strong> <br />
        {description}
      </span>
      <div className={css.emptyCmsButtonWrapper}>
        <Link to={link} className={css.emptyCmsButton}>
          {linkTitle}
        </Link>
      </div>
    </section>
  );
}
