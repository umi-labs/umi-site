import { client } from '@/sanity/lib/client';
import { getPaginatedPostsQuery } from '@/sanity/lib/queries/queries.post';
import { getPaginatedProjectsQuery } from '@/sanity/lib/queries/queries.project';

export async function getPaginatedProjects({
  lastCreatedAt,
  lastId,
}: {
  lastCreatedAt: string;
  lastId: string;
}) {
  return client.fetch(getPaginatedProjectsQuery, { lastCreatedAt, lastId });
}

export async function getPaginatedPosts({
  lastCreatedAt,
  lastId,
}: {
  lastCreatedAt: string;
  lastId: string;
}) {
  return client.fetch(getPaginatedPostsQuery, { lastCreatedAt, lastId });
}
