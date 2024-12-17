import { Container } from '@/app/_components/global/Footer/_components/footer.container';
import { Sponsors } from '@/app/_components/global/Footer/_components/footer.sponsors';
import React from 'react';
import { SettingsPayload } from '@/types';

export default function CenterBar({ data }: { data: SettingsPayload }) {
  return (
    data?.sponsors &&
    data?.sponsors.length > 0 && (
      <Container className="mx-auto flex h-fit w-full max-w-7xl items-center justify-center gap-x-4">
        <Sponsors sponsors={data?.sponsors} />
      </Container>
    )
  );
}
