import * as queryStore from '@sanity/react-loader';
import { type QueryParams, type QueryResponseInitial, type UseQueryOptionsDefinedInitial } from '@sanity/react-loader';

import { SettingsPayload, ThemeSettingsPayload } from '@/types';

import { settingsQuery, themeSettingsQuery } from '../lib/queries';

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptionsDefinedInitial<QueryResponseResult>
) => {
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    options
  );

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return snapshot;
};

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */
export function useSettings(initial: QueryResponseInitial<SettingsPayload>) {
  return useQuery<SettingsPayload>(settingsQuery, {}, { initial });
}

export function useSiteAndThemeSettings(
  siteInitial: QueryResponseInitial<SettingsPayload>,
  themeInitial: QueryResponseInitial<ThemeSettingsPayload>
) {
  const siteSettings = useQuery(
    settingsQuery,
    {},
    {
      initial: siteInitial,
    }
  );
  const { data: themeSettings } = useQuery(
    themeSettingsQuery,
    {},
    {
      initial: themeInitial,
    }
  );
  return { siteSettings, themeSettings };
}
