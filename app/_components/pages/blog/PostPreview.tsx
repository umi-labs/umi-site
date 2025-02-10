'use client';

import { type QueryResponseInitial } from '@sanity/react-loader';

import { postsBySlugQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { PostPayload } from '@/types';

import HomePage from './PostPage';

type Props = {
  initial: QueryResponseInitial<PostPayload | null>;
};

export default function PostPreview(props: Props) {
  const { initial } = props;
  const { data, encodeDataAttribute } = useQuery<PostPayload | null>(
    postsBySlugQuery,
    {},
    { initial }
  );

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <HomePage data={data} encodeDataAttribute={encodeDataAttribute} />;
}
