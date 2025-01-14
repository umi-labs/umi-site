import { Browsers, House, PaintBrushHousehold } from '@phosphor-icons/react';

export const Pages = (S) =>
  S.listItem()
    .title('Pages')
    .icon(Browsers)
    .child(
      S.list()
        .title('Pages')
        .items([
          S.listItem()
            .title('Home')
            .icon(House)
            .child(S.document().schemaType('home').title('Home')),
          S.divider(),
          ...S.documentTypeListItems().filter(
            (item: { getSchemaType: () => string }) =>
              item.getSchemaType() === 'page'
          ),
          // S.documentListItem()
          //   .id('9637eb43-ff35-4f70-bb68-5e014e6d8808')
          //   .schemaType('page')
          //   .title('Pages'),
          S.documentTypeListItem('page').title('Pages'),
        ])
    );

export const Projects = (S) =>
  S.documentTypeListItem('project').title('Projects').icon(PaintBrushHousehold);
