'use client';

import React, { useState, memo, useCallback } from 'react';
import StandardArchiveCard, { FeaturedArchiveCard } from '@/app/_components/ui/card/archive-card';
import { PostPayload, ProjectPayload } from '@/types';
import { Button } from '@/app/_components/ui/button';
import { getPaginatedProjects } from '@/app/_actions/paginationQueries';
import { motion } from 'motion/react';

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

const ArchivesGrid = memo(function ArchivesGrid({
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

  const updateArchives = useCallback(async () => {
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
  }, [archives, paginationConfig]);

  return (
    <div className="w-full">
      {/* Archives */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 w-full">
        {archives?.map((archive, i) => (
          <StandardArchiveCard 
            key={archive._id || i} 
            archive={archive} 
            postType={postType} 
            index={i} 
          />
        ))}
      </div>

      {/* Pagination */}
      {archives?.length! > 9 && (
        <motion.div 
          className="mt-16 flex w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56, delay: 0.35, ease: "easeOut" }}
        >
          <Button
            variant="umi-primary"
            size="lg"
            className="px-8 py-3 text-sm font-semibold"
            onClick={() => {
              setPaginationConfig({
                lastCreatedAt: archives![0]?._createdAt!,
                lastId: archives![0]?._id!,
              });
              updateArchives();
            }}
          >
            Load More {postType === 'post' ? 'Posts' : 'Projects'}
          </Button>
        </motion.div>
      )}
    </div>
  );
});

export default ArchivesGrid;
