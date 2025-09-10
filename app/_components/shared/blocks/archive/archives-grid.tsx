'use client';

import React, { useState } from 'react';
import StandardArchiveCard, { FeaturedArchiveCard } from '@/app/_components/ui/card/archive-card';
import { PostPayload, ProjectPayload } from '@/types';
import { Button } from '@/app/_components/ui/button';
import { getPaginatedProjects } from '@/app/_actions/paginationQueries';

type PostProps = {
  archives: PostPayload[] | undefined;
  postType: 'post' | undefined;
};
type ProjectProps = {
  archives: ProjectPayload[] | undefined;
  postType: 'project' | undefined;
};

type Props = {
  index?: number;
} & (ProjectProps | PostProps);

export default function ArchivesGrid({
  archives: archiveArray,
  postType,
}: Props) {
  const [archives, setArchives] = useState<Props['archives']>([]);

  React.useEffect(() => {
    if (!archiveArray) return;
    setArchives(archiveArray);
  }, [archiveArray]);

  const [paginationConfig, setPaginationConfig] = useState({
    lastCreatedAt: '',
    lastId: '',
  });

  const updateArchives = async () => {
    const { lastCreatedAt, lastId } = paginationConfig;
    const newArchives = await getPaginatedProjects({
      lastCreatedAt: lastCreatedAt,
      lastId: lastId,
    });

    if (!newArchives) return;

    const allArchives = [...archives!, ...newArchives].sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );

    setArchives(allArchives);
  };

  return (
    <div className="w-full">
      {/* Archives */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 w-full">
        {archives?.map((archive, i) => (
          <StandardArchiveCard 
            key={i} 
            archive={archive} 
            postType={postType} 
            index={i} 
          />
        ))}
      </div>

      {/* Pagination */}
      {archives?.length! > 9 && (
        <div className="mt-16 flex w-full justify-center">
          <Button
            variant="outline"
            className="px-8 py-3 text-sm font-medium hover:bg-primary-accent hover:text-white transition-colors"
            onClick={() => {
              setPaginationConfig({
                lastCreatedAt: archives![0]?._createdAt!,
                lastId: archives![0]?._id!,
              });
              updateArchives();
            }}
          >
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  );
}
