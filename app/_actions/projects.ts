import { client } from '@/sanity/lib/client';
import { ProjectPayload } from '@/types';
import { getFeaturedProjectsQuery } from '@/sanity/lib/queries/actions/queries.project';

export async function getFeaturedProjects(): Promise<ProjectPayload[]> {
  return client.fetch(getFeaturedProjectsQuery);
}
