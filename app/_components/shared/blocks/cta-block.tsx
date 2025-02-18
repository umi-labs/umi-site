import React from 'react';
import CTASimple from '@/app/_components/shared/blocks/CTASimple';
import CTAWithForm from '@/app/_components/shared/blocks/CTAWithForm';
import CTATitleImage from '@/app/_components/shared/blocks/CTATitleImage';
import type { CTASimpleProps } from '@/types/components/cta-simple';
import type { CTATitleImageProps } from '@/types/components/cta-title-image';
import type { CTAWithFormProps } from '@/types/components/cta-with-form';

interface Props {
  data: {
    cta: {
      CTA:
        | CTASimpleProps['data']
        | CTATitleImageProps['data']
        | CTAWithFormProps['data'];
    };
  };
}

export default function CTABlock({
  data: {
    cta: { CTA },
  },
}: Props) {
  const cta = CTA ? CTA[0] : null;

  if (!cta) return null;

  switch (cta?._type) {
    case 'ctaSimple':
      return <CTASimple data={cta} />;
    case 'ctaTitleImage':
      return <CTATitleImage data={cta} />;
    case 'ctaWithForm':
      return <CTAWithForm data={cta} />;
    case null:
      return null;
  }
}
