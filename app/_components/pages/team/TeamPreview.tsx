'use client';

import { type QueryResponseInitial } from '@sanity/react-loader';
import { useQuery } from '@/sanity/loader/useQuery';
import { TeamPayload } from '@/types';

import Team from './Team';
import { teamBySlugQuery } from '@/sanity/lib/queries/queries.team';

type Props = {
  params: { slug: string };
  initial: QueryResponseInitial<TeamPayload | null>;
};

export default function TeamPreview(props: Props) {
  const { params, initial } = props;
  const { data } = useQuery<TeamPayload | null>(teamBySlugQuery, params, {
    initial,
  });

  return <Team data={data!} />;
}
