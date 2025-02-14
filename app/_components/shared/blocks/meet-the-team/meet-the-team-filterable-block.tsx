'use client';
import React from 'react';
import { cn } from '@/app/_utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loader from '@/app/_components/ui/loader';
import { filterTeamByDepartment } from '@/app/_actions/team';
import MeetTheTeamGrid from '@/app/_components/shared/blocks/meet-the-team/meet-the-team-grid';
import { reformatTag } from '@/app/_actions/archive-queries';
import { useQueryState } from 'nuqs';
import { Button } from '@/app/_components/ui/button';

export default function MeetTheTeamFilterableBlock() {
  // Departments
  const departments = ['all', 'design', 'development', 'marketing', 'board'];
  const prevId = React.useRef<{ prevId: string | null }>(null);

  const [lastId, setLastId] = React.useState('');

  // Query State
  const [currentDepartment, setCurrentDepartment] = useQueryState(
    'department',
    {
      defaultValue: 'all',
    }
  );

  // Query
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['team', currentDepartment, lastId],
    queryFn: () =>
      filterTeamByDepartment({
        department: reformatTag(currentDepartment),
        lastId,
      }),
    placeholderData: keepPreviousData,
    enabled: !!currentDepartment,
  });

  return (
    <>
      {/* Type */}
      {departments.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 py-6 text-xs text-gray-600">
          {departments.map((department, i) => {
            const isActive =
              reformatTag(currentDepartment).toLowerCase() ===
              department.toLowerCase();
            return (
              <span
                key={i}
                className={cn(
                  'interactable border-b-2 border-gray-200 px-5 py-2 text-center text-sm uppercase text-primary-foreground transition-colors duration-300 ease-in-out',
                  isActive && 'border-primary-foreground'
                )}
                onClick={() => {
                  setCurrentDepartment(department);
                }}
              >
                {department}
              </span>
            );
          })}
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : isSuccess ? (
        <MeetTheTeamGrid team={data} />
      ) : null}

      {isSuccess && data?.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center gap-y-6">
          <h2 className="text-6xl font-semibold italic">
            No Team Members Found
          </h2>
          <p className="text-wrap text-center md:w-1/2">
            There are no team members to display at this time.
          </p>
        </div>
      )}

      {/* Pagination */}
      {isSuccess && data?.length !== 0 && (
        <div className="flex w-full justify-between px-6">
          <Button
            variant="outline"
            disabled={!prevId.current?.prevId}
            className=""
            onClick={() => {
              // This will need to be updated to use the actual lastId if we reach 18 people in the team
              // setLastId(prevId.current?.prevId!); something similar to this but correct :)
              setLastId('');
            }}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            className=""
            onClick={() => {
              setLastId(data![data!.length - 1]?._id!);
              // @ts-ignore
              prevId.current = {
                prevId: data?.[0]?._id,
              };
            }}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

function ErrorMessage() {
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
