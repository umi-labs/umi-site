import { Mailbox, Textbox, Table } from '@phosphor-icons/react';

export const Forms = (S) =>
  S.listItem()
    .title('Forms')
    .icon(Table)
    .child(
      S.list()
        .title('Forms')
        .items([
          S.listItem()
            .title('Add Form')
            .icon(Textbox)
            .child(S.document().schemaType('form').title('Add Form')),
          S.divider(),
          S.documentTypeListItem('form').title('Forms'),
        ])
    );
