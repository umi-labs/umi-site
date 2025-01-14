import { client } from '@/sanity/lib/client';
import { JobPayload } from '@/types';
import {
  getFeaturedJobsQuery,
  getJobsQuery,
} from '@/sanity/lib/queries/queries.job';

export async function getJobs(): Promise<JobPayload[]> {
  return client.fetch(getJobsQuery);
}

export async function getFeaturedJobs(): Promise<JobPayload[]> {
  return client.fetch(getFeaturedJobsQuery);
}
