'use client';
import React from 'react';
import { TeamPayload } from '@/types';
import { cn } from '@/app/_utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loader from '@/app/_components/ui/loader';
import { filterTeamByRole, getTeamRoles } from '@/app/_actions/team';
import MeetTheTeamGrid from '@/app/_components/shared/blocks/meet-the-team/meet-the-team-grid';
import { reformatTag } from '@/app/_actions/archive-queries';

const tagFormatter = (tag: string) => {
  return tag.toLowerCase().split(' ').join('-');
};

export default function MeetTheTeamFilterableBlock() {
  // Router, Pathname, SearchParams
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // State
  const [currentRole, setCurrentRole] = React.useState<string>('All');
  const [team, setTeam] = React.useState<TeamPayload[]>([]);

  // Getting the current role from the URL
  React.useEffect(() => {
    if (searchParams.get('role')) {
      setCurrentRole(searchParams.get('role')!);
    } else {
      setCurrentRole('All');
    }
  }, [searchParams]);

  React.useEffect(() => {
    router.push(`${pathname}?role=all`);
  }, []);

  // Queries
  const { data: rolesQueryResult } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getTeamRoles(),
    placeholderData: keepPreviousData,
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['team', currentRole],
    queryFn: () =>
      filterTeamByRole({
        role: reformatTag(currentRole),
      }),
    placeholderData: keepPreviousData,
    enabled: !!currentRole,
  });

  React.useEffect(() => {
    if (!data) return;
    setTeam(data);
  }, [data]);

  const [roles, setRoles] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!rolesQueryResult || rolesQueryResult.length === 0) return;
    const rolesSet: Set<string | undefined> = new Set(
      rolesQueryResult.map((role) => role.role).flat()
    );

    if (rolesSet.size === 0) return;

    // Convert the Set to an Array
    const rolesArray = ['All', ...rolesSet];

    // @ts-ignore
    setRoles(rolesArray);
  }, [rolesQueryResult]);

  return (
    <>
      {/* Type */}
      {roles.length > 0 && (
        <div className="grid grid-cols-3 gap-y-4 py-6 text-xs text-gray-600">
          {roles.map((role, i) => (
            <span
              key={i}
              className={cn(
                'interactable border-b-2 border-gray-200 px-5 py-2 text-center text-sm uppercase text-primary-foreground transition-colors duration-300 ease-in-out',
                reformatTag(currentRole) === role &&
                  'border-b-2 border-primary-foreground'
              )}
              onClick={() => {
                router.replace(`${pathname}?role=${tagFormatter(role)}`, {
                  scroll: false,
                });
              }}
            >
              {role}
            </span>
          ))}
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : isSuccess ? (
        <MeetTheTeamGrid team={team} />
      ) : null}

      {isSuccess && team?.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center gap-y-6">
          <h2 className="text-6xl font-semibold italic">
            No Team Members Found
          </h2>
          <p className="text-wrap text-center md:w-1/2">
            There are no team members to display at this time.
          </p>
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
