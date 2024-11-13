import type { SettingsPayload, ThemeSettingsPayload } from '@/types';
import { Container } from '@/app/_components/global/Footer/_components/footer.container';
import ImageBox from '@/app/_components/shared/ImageBox';
import Policies from '@/app/_components/global/Footer/_components/footer.policies';
import { CopyText } from '@/app/_components/global/Footer/_components/footer.copytext';
import React from 'react';

export default function BottomBar({
  data,
  logo,
}: {
  data: SettingsPayload;
  logo: ThemeSettingsPayload['logo'];
}) {
  return (
    <div>
      <Container className="flex flex-col items-center justify-center gap-y-4 lg:hidden">
        {logo && (
          <ImageBox
            imageClasses="w-fit h-16 object-cover object-center"
            classesWrapper="flex justify-center items-center lg:hidden"
            image={logo}
            width={800}
            height={300}
          />
        )}
        {data?.policies && <Policies policies={data?.policies} />}
        <CopyText text={data?.footerText} name={data?.name} />
      </Container>
      <Container className="hidden items-center justify-center gap-y-4 lg:flex">
        {data?.contactDetails?.addresses &&
          data?.contactDetails.addresses.length > 0 &&
          data?.contactDetails.addresses.map((address, index) => {
            const res = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
            return (
              <p key={index} className="text-sm font-normal">
                {res}
              </p>
            );
          })}
      </Container>
    </div>
  );
}
