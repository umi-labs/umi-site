import { client } from '@/sanity/lib/client';
import {
  filterTeamByRoleQuery,
  relatedTeamBySlugQuery,
  teamQuery,
  teamRolesQuery,
} from '@/sanity/lib/queries/queries.team';
import { TeamPayload } from '@/types';

export async function getTeam(): Promise<TeamPayload[] | undefined> {
  return client.fetch(teamQuery);
}

export async function getTeamRoles(): Promise<TeamPayload[] | undefined> {
  return client.fetch(teamRolesQuery);
}

export const filterTeamByRole = ({
  role,
}: {
  role: string;
}): Promise<TeamPayload[] | undefined> => {
  if (!role || role === 'All') {
    return client.fetch(teamQuery);
  } else {
    return client.fetch(filterTeamByRoleQuery, { role });
  }
};

export async function getRelatedTeamMembers({
  slug,
}: {
  slug: string;
}): Promise<TeamPayload[] | undefined> {
  if (!slug || slug === '') return;
  return await client.fetch(relatedTeamBySlugQuery, { slug });
}
