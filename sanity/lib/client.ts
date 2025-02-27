import { createClient } from 'next-sanity';

import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
} from '@/sanity/lib/api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_READ_TOKEN,
  // If webhook revalidation is set up we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: !revalidateSecret,
  perspective: 'published',
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});

// console.warn(
//   'This template is using stega to embed Content Source Maps, see more information here: https://www.sanity.io/docs/loaders-and-overlays#26cf681fadd4'
// );
