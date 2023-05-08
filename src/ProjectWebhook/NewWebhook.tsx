import { useNavigate } from "react-router-dom";
import values from "lodash/values";
import keys from "lodash/keys";
import isURL from "validator/lib/isURL";

import { Checkbox, TextField } from "../@shared";
import {
  useSetWebhook,
  useWebhookState,
  useCheckboxState,
  useSetCheckboxState,
} from "../@hooks";
import { TitleField } from "../ProjectSchema/TitleField";
import * as css from "./NewWebhook.css";

import { WEBHOOK_EVENTS_RECORD, WebhookEvent } from "../@types/cms";

export function NewWebhook() {
  const navigate = useNavigate();
  const setWebhook = useSetWebhook();
  const { name, url } = useWebhookState();
  const { values: checkboxValues } = useCheckboxState();
  const { setCheckboxValue } = useSetCheckboxState();

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {
    if (!name || !url || !checkboxValues.size) {
      // TODO toast 적용
      alert("The request field is invalid, please check.");
    }
  };

  const handleEventClick = (value: WebhookEvent) => {
    setCheckboxValue({
      value: value,
      checkboxCount: keys(WEBHOOK_EVENTS_RECORD).length,
    });
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <button
          onClick={handlePrevClick}
          className={`${css.button} ${css.prevButton}`}
        >
          Prev
        </button>
        <button
          onClick={handleSaveClick}
          className={`${css.button} ${css.saveButton}`}
        >
          + Save
        </button>
      </header>
      <section className={css.sectionContainer}>
        <header className={css.sectionHeaderTitle}>
          <h3>Create new Webhook</h3>
        </header>
        <main className={css.sectionWrapper}>
          <div className={css.sectionFieldWrapper}>
            <TitleField>Webhook Name</TitleField>
            <TextField onTextFieldChange={name => setWebhook({ name })} />
          </div>
          <div className={css.sectionFieldWrapper}>
            <TitleField>URL</TitleField>
            <TextField onTextFieldChange={url => setWebhook({ url })} />
            {!isURL(url) && <p className={css.warningMessage}>nono</p>}
          </div>
          <div>
            <TitleField>Events</TitleField>
            <table className={css.table}>
              <thead>
                <tr>
                  <th className={`${css.th} ${css.nameHeader}`}>Name</th>
                  <th className={`${css.th} ${css.checkboxHeader}`}>
                    <Checkbox
                      isParent={true}
                      valuesList={keys(WEBHOOK_EVENTS_RECORD)}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {values(WEBHOOK_EVENTS_RECORD).map((event, index) => (
                  <tr
                    key={event}
                    onClick={() =>
                      handleEventClick(
                        keys(WEBHOOK_EVENTS_RECORD)[index] as WebhookEvent,
                      )
                    }
                    className={css.row}
                  >
                    <td className={css.cell}>{event}</td>
                    <td className={css.checkboxField}>
                      <div className={css.checkboxContainer}>
                        <div
                          onClick={e => e.stopPropagation()}
                          className={css.checkboxWrapper}
                        >
                          <Checkbox
                            value={keys(WEBHOOK_EVENTS_RECORD)[index]}
                            valuesCount={keys(WEBHOOK_EVENTS_RECORD).length}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    </div>
  );
}
