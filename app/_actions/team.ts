import { client } from '@/sanity/lib/client';
import {
  filterTeamByDepartmentQueryPaginatedInitial,
  relatedTeamBySlugQuery,
  teamQuery,
  teamQueryPaginated,
  teamQueryPaginatedInitial,
  teamRolesQuery,
} from '@/sanity/lib/queries/queries.team';
import { TeamPayload } from '@/types';

export async function getTeam(): Promise<TeamPayload[] | undefined> {
  return client.fetch(teamQuery);
}

export async function getTeamRoles(): Promise<TeamPayload[] | undefined> {
  return client.fetch(teamRolesQuery);
}

export async function filterTeamByDepartment({
  department,
  lastId,
}: {
  department: TeamPayload['department'];
  lastId?: string;
}): Promise<TeamPayload[] | undefined> {
  const filterQuery = department?.toLowerCase();

  if (!department || filterQuery === 'all') {
    if (!lastId) return await client.fetch(teamQueryPaginatedInitial);
    return await client.fetch(teamQueryPaginated, {
      department: filterQuery,
      lastId: lastId,
    });
  } else {
    return client.fetch(filterTeamByDepartmentQueryPaginatedInitial, {
      department: filterQuery,
    });
  }
}

export async function getRelatedTeamMembers({
  slug,
}: {
  slug: string;
}): Promise<TeamPayload[] | undefined> {
  if (!slug || slug === '') return;
  return await client.fetch(relatedTeamBySlugQuery, { slug });
}
