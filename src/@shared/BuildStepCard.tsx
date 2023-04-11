import * as css from "./BuildStepCard.css";
import { Avatar } from "./Avatar";

export function BuildStepCard({ step }: { step: number }) {
  const isCurrent = (cardStep: number) => {
    return step === cardStep;
  };

  return (
    <div className={css.container}>
      <div
        className={`${css.card} ${css.firstCard} ${
          isCurrent(1) ? css.currentCard : css.notCurrentCard
        }`}
      >
        <Avatar active={isCurrent(1)}>1</Avatar>
        <p className={css.cardInfo}>
          <span className={css.cardMainInfo}>Select Git Repository</span>
          <span className={css.cardSubInfo}>
            Import an existing Git Repository
          </span>
        </p>
      </div>
      <div
        className={`${css.card} ${css.secondCard} ${
          isCurrent(2) ? css.currentCard : css.notCurrentCard
        }`}
      >
        <Avatar active={isCurrent(2)}>2</Avatar>
        <p className={css.cardInfo}>
          <span className={css.cardMainInfo}>Configure Project</span>
          <span className={css.cardSubInfo}>Configure your Project</span>
        </p>
      </div>
      <div
        className={`${css.card} ${css.thirdCard}  ${
          isCurrent(3) ? css.currentCard : css.notCurrentCard
        }`}
      >
        <Avatar active={isCurrent(3)}>3</Avatar>
        <p className={css.cardInfo}>
          <span className={css.cardMainInfo}>Deploy</span>
          <span className={css.cardSubInfo}>Deploy it</span>
        </p>
      </div>
    </div>
  );
}
