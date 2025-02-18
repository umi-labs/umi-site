import { client } from '@/sanity/lib/client';

import { PostPayload, ProjectPayload } from '@/types';
import {
  getFilteredByTagPostsQuery,
  getFilteredByTypePostsQuery,
  getFullyFilteredPostsQuery,
  getPostsByAuthorQuery,
  getPostsQuery,
  getPostTagsAndTypesQuery,
} from '@/sanity/lib/queries/queries.post';
import {
  getFilteredProjectsQuery,
  getProjectsQuery,
  getProjectTagsQuery,
} from '@/sanity/lib/queries/queries.project';

export const reformatTag = (tag: string) => {
  const tagArray = tag.split('-');

  if (tagArray.length === 1) {
    return tag.slice(0, 1).toUpperCase() + tag.slice(1).toLowerCase();
  } else {
    return tagArray
      .map((word, i) => {
        return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }
};

export async function getPostsByAuthor({
  slug,
}: {
  slug: string;
}): Promise<PostPayload[] | undefined> {
  if (!slug || slug === '') return;
  return client.fetch(getPostsByAuthorQuery, { slug });
}

export async function getFilteredArchives({
  tag,
  type,
  postType,
}: {
  tag?: string;
  type?: string;
  postType: string;
}): Promise<PostPayload[] | ProjectPayload[] | undefined> {
  if (postType === 'project') {
    if (!tag || tag.toLowerCase() === 'all') {
      return client.fetch(getProjectsQuery);
    }

    return await client.fetch(getFilteredProjectsQuery, {
      // @ts-ignore
      tag: tag.toLowerCase(),
    });
  } else if (postType === 'post') {
    if ((!tag || tag === 'all') && (!type || type === 'all')) {
      return client.fetch(getPostsQuery);
    } else if (!tag || tag === 'all') {
      return client.fetch(getFilteredByTypePostsQuery, { type });
    } else if (!type || type === 'all') {
      return client.fetch(getFilteredByTagPostsQuery, {
        // @ts-ignore
        tag: reformatTag(tag),
      });
    } else {
      return client.fetch(getFullyFilteredPostsQuery, {
        // @ts-ignore
        tag: reformatTag(tag),
        type,
      });
    }
  }
}

export async function getArchiveTagsAndTypes({
  postType,
}: {
  postType: string;
}) {
  if (postType === 'project') {
    return client.fetch(getProjectTagsQuery);
  } else if (postType === 'post') {
    return client.fetch(getPostTagsAndTypesQuery);
  }
}

export async function getArchives({ postType }: { postType: string }) {
  if (postType === 'project') {
    return client.fetch(getProjectsQuery);
  } else if (postType === 'post') {
    return client.fetch(getPostsQuery);
  }
}
