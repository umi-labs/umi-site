import React from 'react';
import { PortableTextBlock } from 'next-sanity';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/Component';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { FormType } from '@/types/components/form';
import Container from '@/app/_components/ui/container';

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
    <Container id="FormBlock">
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
    </Container>
  );
}
