'use client';
import React from 'react';
import ArchivesGrid from '@/app/_components/shared/blocks/archive/archives-grid';
import ArchiveSidebar from '@/app/_components/shared/blocks/archive/archive-sidebar';
import { PostPayload, ProjectPayload } from '@/types';
import {
  getArchiveTagsAndTypes,
  getFilteredArchives,
} from '@/app/_actions/archive-queries';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loader from '@/app/_components/ui/loader';
import { ArchiveGridSkeleton } from '@/app/_components/ui/skeleton/archive-card-skeleton';
import { useQueryState } from 'nuqs';

interface Props {
  archives: ProjectPayload[] | PostPayload[] | undefined;
  postType?: 'project' | 'post' | undefined;
}

const tagFormatter = (tag: string) => {
  return tag?.toLowerCase().split(' ').join('-');
};

export default function ArchivesFilterableBlock({ postType }: Props) {
  const [currentTag, setCurrentTag] = useQueryState('tag', {
    defaultValue: 'all',
  });
  const [currentType, setCurrentType] = useQueryState('type', {
    defaultValue: 'all',
  });

  // State
  const [featuredArchives, setFeaturedArchives] = React.useState<
    Props['archives']
  >([]);

  // Queries
  const {
    data: filters,
    isLoading: filtersIsLoading,
    isError: filtersIsError,
    isSuccess: filtersIsSuccess,
    error: filtersError,
  } = useQuery({
    queryKey: ['TagsAndTypes', postType],
    queryFn: () =>
      getArchiveTagsAndTypes({
        postType: postType!,
      }),
    placeholderData: keepPreviousData,
    enabled: !!postType,
  });

  const {
    data: archives,
    isLoading: archivesIsLoading,
    isError: archivesIsError,
    isSuccess: archivesIsSuccess,
    error: archivesError,
  } = useQuery({
    queryKey: ['archives', currentTag, currentType, postType],
    queryFn: () =>
      getFilteredArchives({
        tag: currentTag,
        type: currentType,
        postType: postType!,
      }),
    placeholderData: keepPreviousData,
    enabled: !!currentTag,
  });

  React.useEffect(() => {
    if (!archives || archives.length === 0) return;
    setFeaturedArchives(archives.filter((archive) => archive.featured));
  }, [archives]);

  const [tags, setTags] = React.useState<string[]>([]);
  const [types, setTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (filtersIsError || filtersIsLoading || filters.length === 0) return;
    const tagsSet: Set<string> = new Set(
      filters?.map((archive) => archive.tags).flat()
    );

    if (tagsSet.size === 0) return;

    // Convert the Set to an Array
    const tagsArray = ['all', ...tagsSet];

    setTags(tagsArray.filter((tag) => tag !== null));

    const typesSet: Set<string> = new Set(
      filters?.map((archive) => archive.type).flat()
    );

    if (typesSet.size === 0) return;

    // Convert the Set to an Array
    const typesArray = ['all', ...typesSet];

    setTypes(typesArray.filter((tag) => tag !== null));
  }, [filters]);

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const tagFormatter = (tag: string) => {
    return tag?.toLowerCase().split(' ').join('-');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-0">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <span className="font-medium text-gray-900">Filters</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Mobile Filters */}
        {isFiltersOpen && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="space-y-4">
              {/* Type Filter - Only for posts */}
              {postType === 'post' && types.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Filter by Type</h4>
                  <div className="space-y-2">
                    {types.map((type, i) => (
                      <button
                        key={i}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                          currentType === type
                            ? 'bg-primary-accent text-white border-primary-accent'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setCurrentType(tagFormatter(type));
                        }}
                      >
                        {type === 'all' ? 'All Types' : type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags Filter */}
              {tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {postType === 'project' ? 'Filter by Service' : 'Filter by Category'}
                  </h4>
                  <div className="space-y-2">
                    {tags.map((tag, i) => (
                      <button
                        key={i}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          currentTag === tagFormatter(tag)
                            ? 'bg-primary-accent text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => {
                          setCurrentTag(tagFormatter(tag));
                        }}
                      >
                        {tag === 'all' ? 'All' : tag?.split('-').join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="col-span-3">
          {archivesIsLoading ? (
            <ArchiveGridSkeleton count={6} hasFeatured={featuredArchives.length > 0} />
          ) : archivesIsError ? (
            <ErrorMessage error={archivesError} />
          ) : archivesIsSuccess ? (
            // @ts-expect-error - type conditional is being a pain
            <ArchivesGrid archives={archives} postType={postType} />
          ) : null}

          {archivesIsSuccess && archives?.length === 0 && (
            <div className="flex size-full flex-col items-center justify-center gap-y-6">
              <h2 className="text-6xl font-semibold italic">No Archives Found</h2>
              <p className="text-wrap text-center md:w-1/2">
                There are no archives to display at this time.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          <ArchiveSidebar
            postType={postType}
            tags={tags}
            types={types}
            currentTag={currentTag}
            currentType={currentType}
            setCurrentTag={setCurrentTag}
            setCurrentType={setCurrentType}
          />
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden w-full">
        {archivesIsLoading ? (
          <ArchiveGridSkeleton count={6} hasFeatured={featuredArchives.length > 0} />
        ) : archivesIsError ? (
          <ErrorMessage error={archivesError} />
        ) : archivesIsSuccess ? (
          // @ts-expect-error - type conditional is being a pain
          <ArchivesGrid archives={archives} postType={postType} />
        ) : null}

        {archivesIsSuccess && archives?.length === 0 && (
          <div className="flex size-full flex-col items-center justify-center gap-y-6">
            <h2 className="text-4xl font-semibold italic">No Archives Found</h2>
            <p className="text-wrap text-center">
              There are no archives to display at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ErrorMessage({ error }: { error?: Error }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-6">
      <h2 className="text-6xl font-semibold italic">Error</h2>
      <p className="text-wrap text-center md:w-1/2">
        {error
          ? error.message
          : 'There seems to have been a small issue. Please refresh your browser or return home if issue persists.'}
      </p>
    </div>
  );
}
