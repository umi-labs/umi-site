import { client } from '@/sanity/lib/client';
import { getLogosQuery } from '@/sanity/lib/queries/queries.logo';
import type { Image as ImageType } from '@/types/generics';

export interface LogosPayload {
  logo: ImageType;
  name?: string | undefined;
  link?: string | undefined;
}

export async function getLogos(): Promise<LogosPayload[]> {
  return await client.fetch(getLogosQuery);
}
