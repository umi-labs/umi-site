import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import type { PostPayload } from '@/types';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';

export interface PostProps {
  data: PostPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function Post({ data, encodeDataAttribute }: PostProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, body } = data ?? {};

  return (
    <div className="">
      {body && (
        <CustomPortableText
          value={body}
          paragraphClasses="max-w-3xl mx-auto my-40 text-center px-6"
        />
      )}
    </div>
  );
}

export default Post;
