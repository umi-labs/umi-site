import React from 'react';
import { PortableTextBlock } from 'next-sanity';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/Component';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { FormType } from '@/types/components/form';

interface Props {
  data: {
    enableIntro?: boolean;
    introContent?: PortableTextBlock[];
    form: FormType;
  };
}

export default function FormBlock({ data }: Props) {
  const { enableIntro, introContent, form } = data;
  return (
    <section
      id="FormBlock"
      className="relative mx-auto mb-8 mt-24 flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-10 px-6 md:px-28"
    >
      {enableIntro && introContent && (
        <CustomPortableText
          value={introContent}
          paragraphClasses="text-center"
        />
      )}

      <FormBuilderBlock
        form={form}
        uid={form._key}
        className="w-full max-w-2xl"
      />
    </section>
  );
}
