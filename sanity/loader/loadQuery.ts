import 'server-only';

import * as queryStore from '@sanity/react-loader';
import { draftMode } from 'next/headers';

import { client } from '@/sanity/lib/client';
import {
  homePageQuery,
  pagesBySlugQuery,
  postsBySlugQuery,
  projectsBySlugQuery,
  seoSettingsQuery,
  settingsQuery,
  themeSettingsQuery,
} from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import {
  HomePagePayload,
  PagePayload,
  PostPayload,
  ProjectPayload,
  SEOSettingsPayload,
  SettingsPayload,
  TeamPayload,
  ThemeSettingsPayload,
} from '@/types';
import { servicesBySlugQuery } from '@/sanity/lib/queries/queries.service';
import { teamBySlugQuery } from '@/sanity/lib/queries/queries.team';

const serverClient = client.withConfig({
  token,
  stega: process.env.VERCEL_ENV === 'preview',
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = (async (query, params = {}, options = {}) => {
  const {
    perspective = (await draftMode()).isEnabled ? 'previewDrafts' : 'published',
  } = options;
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: (await draftMode()).isEnabled,
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ['settings', 'home', 'page'] } }
  );
}

export function loadSEOSettings() {
  return loadQuery<SEOSettingsPayload>(
    seoSettingsQuery,
    {},
    { next: { tags: ['seoSettings', 'home', 'page'] } }
  );
}

export function loadThemeSettings() {
  return loadQuery<ThemeSettingsPayload>(
    themeSettingsQuery,
    {},
    { next: { tags: ['settings', 'home', 'page'] } }
  );
}

export function loadHomePage() {
  return loadQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { next: { tags: ['home'] } }
  );
}

export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } }
  );
}

export function loadPost(slug: string) {
  return loadQuery<PostPayload | null>(
    postsBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } }
  );
}

export function loadProject(slug: string) {
  return loadQuery<ProjectPayload | null>(
    projectsBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } }
  );
}

export function loadService(slug: string) {
  return loadQuery<PagePayload | null>(
    servicesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } }
  );
}

export function loadTeam(slug: string) {
  return loadQuery<TeamPayload | null>(
    teamBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } }
  );
}
