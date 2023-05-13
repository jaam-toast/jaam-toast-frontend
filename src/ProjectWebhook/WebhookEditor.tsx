import { useEffect } from "react";
import values from "lodash/values";
import keys from "lodash/keys";

import { Checkbox, TextField } from "../@shared";
import {
  useSetWebhook,
  useWebhookState,
  useSetCheckboxState,
  useWebhookErrorMessageState,
} from "../@hooks";
import { TitleField } from "../ProjectSchema/TitleField";
import * as css from "./NewWebhook.css";

import { WEBHOOK_EVENTS_RECORD, WebhookEvent } from "../@types/cms";

export function WebhookEditor({ title }: { title: string }) {
  const webhook = useWebhookState();
  const warningMessage = useWebhookErrorMessageState();
  const { setWebhookName, setWebhookUrl } = useSetWebhook();
  const { setCheckboxValue } = useSetCheckboxState();

  useEffect(() => {
    webhook.events.forEach(event => {
      setCheckboxValue({
        value: event,
        checkboxCount: keys(WEBHOOK_EVENTS_RECORD).length,
        isInitialize: true,
      });
    });
  }, []);

  const handleEventClick = (value: WebhookEvent) => {
    setCheckboxValue({
      value: value,
      checkboxCount: keys(WEBHOOK_EVENTS_RECORD).length,
    });
  };

  return (
    <section className={css.sectionContainer}>
      <header className={css.sectionHeaderTitle}>
        <h3>{title}</h3>
      </header>
      <main className={css.sectionWrapper}>
        <div className={css.sectionFieldWrapper}>
          <TitleField>Webhook Name</TitleField>
          <TextField
            value={webhook.name}
            onTextFieldChange={name => setWebhookName(name)}
          />
          {!!warningMessage.name && (
            <p className={css.warningMessage}>{warningMessage.name}</p>
          )}
        </div>
        <div className={css.sectionFieldWrapper}>
          <TitleField>URL</TitleField>
          <TextField
            value={webhook.url}
            onTextFieldChange={url => setWebhookUrl(url)}
          />
          {!!warningMessage.url && (
            <p className={css.warningMessage}>{warningMessage.url}</p>
          )}
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
  );
}
