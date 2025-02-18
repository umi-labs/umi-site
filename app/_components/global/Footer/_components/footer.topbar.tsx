import type { SettingsPayload, ThemeSettingsPayload } from '@/types';
import ImageBox from '@/app/_components/shared/ImageBox';
import {
  Contact,
  Container,
  CopyText,
  MenuContainer,
  Policies,
} from '@/app/_components/global/Footer/_components/index';
import Link from '@/app/_components/ui/link';
import React from 'react';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

export default function TopBar({
  data,
  logo,
}: {
  data: SettingsPayload;
  logo: ThemeSettingsPayload['logo'];
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap justify-between gap-9 lg:flex-nowrap">
      <Container className="col-span-1 hidden flex-col items-start justify-start gap-y-4 lg:flex">
        <NextLink href={'/'}>
          {logo && (
            <ImageBox
              imageClasses="w-fit h-16 object-cover object-center"
              classesWrapper={'flex justify-start items-start'}
              image={logo}
              width={800}
              height={300}
            />
          )}
        </NextLink>
        <CopyText text={data?.footerText} name={data?.name} />
        {data?.policies && <Policies policies={data?.policies} />}
      </Container>
      <Container
        className={cn(
          'col-span-2 grid w-fit grid-cols-2 gap-x-6 gap-y-8',
          `grid-cols-${(data.footerNav && data.footerNav?.menu?.length + 1) || 1}`
        )}
      >
        {data.footerNav?.menu?.map((menu, index) => (
          <MenuContainer key={index} title={menu.title}>
            <ul className="flex flex-col gap-y-4">
              {menu.subNavigation !== 'none' &&
                menu.nav.map((item, index) => (
                  <li key={index}>
                    <Link
                      link={item}
                      className="text-xs text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-700"
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </MenuContainer>
        ))}
        <Contact
          contactDetails={data?.contactDetails}
          socialLinks={data?.socialLinks}
        />
      </Container>
    </div>
  );
}
