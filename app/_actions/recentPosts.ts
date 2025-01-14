'use server';
import { client } from '@/sanity/lib/client';
import { recentPostsQuery } from '@/sanity/lib/queries/queries.post';

export async function getRecentPosts() {
  return client.fetch(recentPostsQuery);
}
