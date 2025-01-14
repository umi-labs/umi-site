import { NoteBlank, Plus } from '@phosphor-icons/react';

export const PostTypes = (S) => {
  return S.documentTypeListItem('postType')
    .title('Post Types')
    .icon(NoteBlank)
    .child(
      S.documentList()
        .apiVersion('2024-06-01')
        .title('Post Types')
        .schemaType('postType')
        .filter('_type == "postType"')
        .menuItems([
          S.menuItem()
            .title('Add Post Type')
            .icon(Plus)
            .intent({
              type: 'create',
              params: [{ type: 'postType' }],
            }),
        ])
        .child(
          (
            id: string // Returns the id for the selected post-type document
          ) => {
            return S.documentList()
              .title('Pages')
              .schemaType('page')
              .filter('_type == "page" && postType._ref == $id')
              .params({ id }) // use the id in the filter to return pages that has a reference to the postType
              .menuItems([
                S.menuItem()
                  .title('Add Page')
                  .icon(Plus)
                  .intent({
                    type: 'create',
                    params: [{ type: 'page' }, { postType: { _ref: id } }],
                  }),
              ]);
          }
        )
    );
};
