import { client } from '@/sanity/lib/client';
import {
  getFeaturedReviewsQuery,
  getReviewsQuery,
} from '@/sanity/lib/queries/queries.review';
import { ReviewPayload } from '@/types';

export async function getReviews(): Promise<ReviewPayload[]> {
  return client.fetch(getReviewsQuery);
}

export async function getFeaturedReviews(): Promise<ReviewPayload[]> {
  return client.fetch(getFeaturedReviewsQuery);
}
