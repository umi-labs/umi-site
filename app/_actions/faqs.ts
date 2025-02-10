import { client } from '@/sanity/lib/client';
import { getFAQsByTypeQuery } from '@/sanity/lib/queries/queries.faqs';
import { PortableTextBlock } from 'next-sanity';

export interface FAQPayload {
  _id: string;
  _createdAt: string;
  question: string;
  answer: PortableTextBlock[];
  tag: string;
}

export async function getFAQsByType({
  type,
}: {
  type: string;
}): Promise<FAQPayload[]> {
  return client.fetch(getFAQsByTypeQuery, { type });
}
