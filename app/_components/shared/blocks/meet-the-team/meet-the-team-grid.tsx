'use client';

import React, { useState } from 'react';
import { TeamPayload } from '@/types';
import { Button } from '@/app/_components/ui/button';
import { getPaginatedProjects } from '@/app/_actions/paginationQueries';
import TeamCard from '@/app/_components/ui/card/team-card';

type Props = {
  index?: number;
  team: TeamPayload[] | undefined;
};

export default function MeetTheTeamGrid({ team: teamArray }: Props) {
  const [team, setTeam] = useState<Props['team']>([]);

  React.useEffect(() => {
    if (!teamArray) return;
    setTeam(teamArray);
  }, [teamArray]);

  const [paginationConfig, setPaginationConfig] = useState({
    lastCreatedAt: '',
    lastId: '',
  });

  const updateArchives = async () => {
    const { lastCreatedAt, lastId } = paginationConfig;
    const newTeam = await getPaginatedProjects({
      lastCreatedAt: lastCreatedAt,
      lastId: lastId,
    });

    if (!newTeam) return;

    const allTeam = [...team!, ...newTeam].sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );

    setTeam(allTeam);
  };

  return (
    <div className="size-full">
      {/* Archives */}
      <div className="grid h-full w-full grid-cols-1 items-center justify-center gap-16 px-6 py-10 md:grid-cols-2 lg:grid-cols-3">
        {team?.map((member, i) => <TeamCard team={member} key={i} />)}
      </div>

      {/* Pagination */}
      {team?.length! > 9 && (
        <div className="my-12 flex w-full justify-center">
          <Button
            variant="outline"
            className=""
            onClick={() => {
              setPaginationConfig({
                lastCreatedAt: team![0]?._createdAt!,
                lastId: team![0]?._id!,
              });
              updateArchives();
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
