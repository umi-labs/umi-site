'use client';

import { type QueryResponseInitial } from '@sanity/react-loader';

import { projectsBySlugQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { ProjectPayload } from '@/types';

import Project from './Project';

type Props = {
  params: { slug: string };
  initial: QueryResponseInitial<ProjectPayload | null>;
};

export default function ProjectPreview(props: Props) {
  const { params, initial } = props;
  const { data } = useQuery<ProjectPayload | null>(
    projectsBySlugQuery,
    params,
    {
      initial,
    }
  );

  return <Project data={data!} />;
}
