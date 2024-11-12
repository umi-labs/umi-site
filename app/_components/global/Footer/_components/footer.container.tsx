import React from 'react';
import { cn } from '@/lib/utils';

export const Container = ({
  children,
  classes,
}: {
  children: React.ReactNode;
  classes: React.ComponentProps<'div'>['className'];
}) => {
  return <div className={cn('py-8', classes)}>{children}</div>;
};
