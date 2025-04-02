import { client } from '@/sanity/lib/client';
import { getLogosQuery } from '@/sanity/lib/queries/actions/queries.logo';
import { NavItem } from '@/types/components/nav';
import type { Image as ImageType, Link } from '@/types/generics';

export interface LogosPayload {
  logo: ImageType;
  name?: string | undefined;
  link?: NavItem;
}

export async function getLogos(): Promise<LogosPayload[]> {
  return await client.fetch(getLogosQuery);
}
