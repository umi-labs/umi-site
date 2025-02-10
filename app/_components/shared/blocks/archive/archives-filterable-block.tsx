'use client';
import React from 'react';
import { FeaturedArchiveCard } from '@/app/_components/ui/card/archive-card';
import ArchivesGrid from '@/app/_components/shared/blocks/archive/archives-grid';
import { PostPayload, ProjectPayload } from '@/types';
import { cn } from '@/app/_utils';
import {
  getArchiveTagsAndTypes,
  getFilteredArchives,
} from '@/app/_actions/archive-queries';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loader from '@/app/_components/ui/loader';
import { useQueryState } from 'nuqs';

interface Props {
  archives: ProjectPayload[] | PostPayload[] | undefined;
  postType?: 'project' | 'post' | undefined;
}

const tagFormatter = (tag: string) => {
  return tag.toLowerCase().split(' ').join('-');
};

export default function ArchivesFilterableBlock({ postType }: Props) {
  const [currentTag, setCurrentTag] = useQueryState('tag', {
    defaultValue: 'all',
  });
  const [currentType, setCurrentType] = useQueryState('type', {
    defaultValue: 'all',
  });

  // State
  const [archives, setArchives] = React.useState<Props['archives']>([]);

  // Queries
  const tagsAndTypes = useQuery({
    queryKey: ['TagsAndTypes', postType],
    queryFn: () =>
      getArchiveTagsAndTypes({
        postType: postType!,
      }),
    placeholderData: keepPreviousData,
    enabled: !!postType,
  });

  const { data, isLoading, isError, isSuccess, error } = useQuery({
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
    if (!data) return;
    setArchives(data);
  }, [data]);

  const [featuredArchives, setFeaturedArchives] = React.useState<
    Props['archives']
  >([]);

  React.useEffect(() => {
    if (!archives || archives.length === 0) return;
    setFeaturedArchives(archives.filter((archive) => archive.featured));
  }, [archives]);

  const [tags, setTags] = React.useState<string[]>([]);
  const [types, setTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!tagsAndTypes.data || tagsAndTypes.data.length === 0) return;
    const tagsSet: Set<string> = new Set(
      tagsAndTypes.data?.map((archive) => archive.tags).flat()
    );

    if (tagsSet.size === 0) return;

    // Convert the Set to an Array
    const tagsArray = ['all', ...tagsSet];

    setTags(tagsArray);

    if (!tagsAndTypes.data || tagsAndTypes.data.length === 0) return;
    const typesSet: Set<string> = new Set(
      tagsAndTypes.data?.map((archive) => archive.type).flat()
    );

    if (typesSet.size === 0) return;

    // Convert the Set to an Array
    const typesArray = ['all', ...typesSet];

    setTypes(typesArray);
  }, [tagsAndTypes.data]);

  return (
    <>
      {/* Type */}
      {postType === 'post' && types.length > 0 && (
        <div className="flex gap-y-4 py-6 text-xs text-gray-600">
          {types.map((type, i) => (
            <span
              key={i}
              className={cn(
                'interactable cursor-pointer border-b-2 border-gray-200 px-5 py-2 text-center text-sm uppercase text-primary-foreground transition-colors duration-300 ease-in-out',
                currentType === type && 'border-b-2 border-primary-foreground'
              )}
              onClick={() => {
                setCurrentType(tagFormatter(type));
              }}
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 py-6 text-xs text-gray-600 lg:py-0">
          {tags.map((tag, i) => {
            return (
              <span
                key={i}
                className={cn(
                  'interactable cursor-pointer rounded-full bg-gray-200 px-5 py-2 text-sm uppercase text-primary-foreground transition-colors duration-300 ease-in-out hocus:bg-primary-foreground hocus:text-primary-background',
                  currentTag === tagFormatter(tag) &&
                    'bg-primary-foreground text-primary-background'
                )}
                onClick={() => {
                  setCurrentTag(tagFormatter(tag));
                }}
              >
                {tag.split('-').join(' ')}
              </span>
            );
          })}
        </div>
      )}

      {/* Featured Archives */}
      {(postType === 'project' || postType === 'post') &&
        currentTag === 'all' &&
        currentType === 'all' &&
        featuredArchives!.length > 0 && (
          <div className="grid h-full w-full grid-flow-row grid-cols-1 items-center justify-center gap-8 px-6 py-10 md:gap-12 lg:gap-16">
            {featuredArchives?.map((archive, i) => (
              <FeaturedArchiveCard
                key={i}
                index={i}
                archive={archive}
                postType={postType}
              />
            ))}
          </div>
        )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : isSuccess ? (
        // @ts-expect-error - type conditional is being a pain
        <ArchivesGrid archives={archives} postType={postType} />
      ) : null}

      {isSuccess && archives?.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center gap-y-6">
          <h2 className="text-6xl font-semibold italic">No Archives Found</h2>
          <p className="text-wrap text-center md:w-1/2">
            There are no archives to display at this time.
          </p>
        </div>
      )}
    </>
  );
}

export function ErrorMessage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-6">
      <h2 className="text-6xl font-semibold italic">Error</h2>
      <p className="text-wrap text-center md:w-1/2">
        There seems to have been a small issue. Please refresh your browser or
        return home if issue persists.
      </p>
    </div>
  );
}
