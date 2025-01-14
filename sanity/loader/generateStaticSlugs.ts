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
  const data: Array<{ slug: string; children?: Array<{ slug: string }> }> =
    await client
      .withConfig({
        token,
        perspective: 'published',
        useCdn: false,
        stega: false,
      })
      .fetch(
        groq`*[_type == $type && defined(slug.current)]{
          "slug": slug.current,
          "children": *[_type == ^.contentType && postType->slug.current == ^.slug.current]{
            "slug": slug.current
          }
        }`,
        { type }
      );

  return data.map(
    (item: { slug: string; children?: Array<{ slug: string }> }) => {
      const currentPath: NestedSlugs = {
        parent: item.slug,
        children: [],
      };

      item?.children?.map((child) => {
        currentPath.children?.push(child.slug);
      });

      return currentPath;
    }
  );
}
