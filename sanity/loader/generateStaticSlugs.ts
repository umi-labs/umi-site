import 'server-only';

import { groq } from 'next-sanity';

import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
      { type },
      {
        next: {
          tags: [type],
        },
      }
    );
}

export async function generateNestedStaticSlugs(type: string) {
  const paths = await fetchNestedSlugs(type);
  return paths.map((path) => ({ slug: path }));
}

type NestedSlugs = {
  parent: string;
  children?: Array<string>;
};

// Utility function to recursively generate paths for nested post types
async function fetchNestedSlugs(type = 'page'): Promise<NestedSlugs[]> {
  const data: Array<{
    slug: string;
    parentSlug: string;
    parentPage: string;
    children?: Array<{ slug: string }>;
  }> = await client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch(
      groq`
      *[_type == $type] {
        "slug": slug.current,
        "parentSlug": parent.parentSlug,
        "parentPage": parent.parentPage->slug.current
      }`,
      { type }
    );

  let correctedPaths: NestedSlugs[] = [];

  data.map((item: { slug: string; parentSlug: string; parentPage: string }) => {
    if (!item.parentSlug && !item.parentPage) {
      correctedPaths.push({
        parent: item.slug,
        children: [],
      });
      return;
    }

    if (
      item.parentSlug &&
      !correctedPaths.find((path) => path.parent === item.parentSlug)
    ) {
      correctedPaths.push({
        parent: item.parentSlug,
        children: [],
      });
    } else if (
      item.parentPage &&
      !correctedPaths.find((path) => path.parent === item.parentPage)
    ) {
      correctedPaths.push({
        parent: item.parentPage,
        children: [],
      });
    }

    correctedPaths.map((path) => {
      if (item.parentSlug === path.parent) {
        if (path.children?.includes(item.slug)) {
          return;
        } else {
          path.children?.push(item.slug);
        }
      } else if (item.parentPage === path.parent) {
        path.children?.push(item.slug);
      }
    });
  });

  return correctedPaths;

  // const res = data.map(
  //   (item: { slug: string; parentSlug: string; parentPage: string }) => {
  //     if (!item.parentSlug && !item.parentPage) {
  //       return {
  //         parent: item.slug,
  //         children: [],
  //       };
  //     }
  //
  //     let currentPath: NestedSlugs;
  //
  //     if (item.parentSlug) {
  //       currentPath = {
  //         parent: item.parentSlug,
  //         children: [],
  //       };
  //     } else {
  //       currentPath = {
  //         parent: item.parentPage,
  //         children: [],
  //       };
  //     }
  //
  //     if (
  //       item.parentPage === currentPath.parent ||
  //       item.parentSlug === currentPath.parent
  //     ) {
  //       currentPath.children?.push(item.slug);
  //     }
  //
  //     return currentPath;
  //   }
  // );
  //
  //
  // return data.map(
  //   (item: { slug: string; children?: Array<{ slug: string }> }) => {
  //     const currentPath: NestedSlugs = {
  //       parent: item.slug,
  //       children: [],
  //     };
  //
  //     item?.children?.map((child) => {
  //       currentPath.children?.push(child.slug);
  //     });
  //
  //     return currentPath;
  //   }
  // );
}


// *[_type == $type && defined(slug.current)]{
//   "slug": slug.current,
//     "parent": parent.current,
//     "children": *[_type == ^.contentType && postType->slug.current == ^.slug.current]{
//     "slug": slug.current
//   }
// }