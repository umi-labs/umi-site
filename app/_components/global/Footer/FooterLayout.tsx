'use client';

import React from 'react';

import type { SettingsPayload, ThemeSettingsPayload } from '@/types';

import ImageBox from '@/app/_components/shared/ImageBox';
import {
  Container,
  CopyText,
  MenuContainer,
  Sponsors,
} from '@/app/_components/global/Footer/_components';
import Contact from '@/app/_components/global/Footer/_components/footer.contact';

interface FooterProps {
  data: SettingsPayload;
  theme: ThemeSettingsPayload;
}

export default function Footer(props: FooterProps) {
  const { data, theme } = props;
  const { logo } = theme || {};

  return (
    <footer className="bottom-0 grid w-full grid-flow-row-dense divide-y-2 divide-[#EAECED] px-6 py-8">
      <div className="grid-cols-3 gap-9 lg:grid">
        <Container classes="hidden lg:flex flex-col items-start justify-start col-span-1 gap-y-4">
          {logo && (
            <ImageBox
              imageClasses="w-fit h-16 object-cover object-center"
              classesWrapper={'flex justify-start items-start'}
              image={logo}
              width={800}
              height={300}
            />
          )}
          <CopyText text={data?.footerText} name={data?.name} />
        </Container>
        <Container classes="col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 w-full">
          <MenuContainer title="Main Menu">Area 1</MenuContainer>
          <MenuContainer title="Services">Area 2</MenuContainer>
          <MenuContainer title="Latest Work">Area 3</MenuContainer>
          <Contact
            contactDetails={data?.contactDetails}
            socialLinks={data?.socialLinks}
          />
        </Container>
      </div>
      {data?.sponsors && data?.sponsors.length > 0 && (
        <Container classes="flex items-center justify-center gap-x-4 h-fit">
          <Sponsors sponsors={data?.sponsors} />
        </Container>
      )}
      <Container classes="flex flex-col items-center justify-center gap-y-4">
        {logo && (
          <ImageBox
            imageClasses="w-fit h-16 object-cover object-center"
            classesWrapper={'flex lg:hidden justify-center items-center'}
            image={logo}
            width={800}
            height={300}
          />
        )}
        <CopyText text={data?.footerText} name={data?.name} />
      </Container>
    </footer>
  );
}
