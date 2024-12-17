'use server';

import { recentPostsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

export async function getRecentPosts() {
  return client.fetch(recentPostsQuery);
}
