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
      {/* Department Filters */}
      {departments.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 py-8">
          {departments.map((department, i) => {
            const isActive =
              reformatTag(currentDepartment).toLowerCase() ===
              department.toLowerCase();
            return (
              <button
                key={i}
                className={cn(
                  'px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ease-in-out',
                  isActive 
                    ? 'bg-[#313E4E] text-white border border-[#313E4E] shadow-lg' 
                    : 'bg-white text-[#313E4E] border border-[#313E4E]/20 hover:bg-[#313E4E] hover:text-white hover:border-[#313E4E]'
                )}
                onClick={() => {
                  setCurrentDepartment(department);
                }}
              >
                {department}
              </button>
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
        <div className="flex size-full flex-col items-center justify-center gap-y-6 py-16">
          <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent">
            No Team Members Found
          </h2>
          <p className="text-wrap text-center md:w-1/2 text-[#313E4E]/80 text-lg">
            There are no team members to display at this time.
          </p>
        </div>
      )}

      {/* Pagination */}
      {isSuccess && data?.length !== 0 && (
        <div className="flex w-full justify-center gap-4 px-6 py-8">
          <Button
            variant="outline"
            disabled={!prevId.current?.prevId}
            className="bg-white text-[#313E4E] border-[#313E4E]/20 hover:bg-[#313E4E] hover:text-white hover:border-[#313E4E] disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="bg-white text-[#313E4E] border-[#313E4E]/20 hover:bg-[#313E4E] hover:text-white hover:border-[#313E4E]"
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
    <div className="flex size-full flex-col items-center justify-center gap-y-6 py-16">
      <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-white via-[#B0DEE6] to-[#FFE48C] bg-clip-text text-transparent">
        Error
      </h2>
      <p className="text-wrap text-center md:w-1/2 text-white/80 text-lg">
        There seems to have been a small issue. Please refresh your browser or
        return home if issue persists.
      </p>
    </div>
  );
}
