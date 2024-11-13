import React from 'react';
import { cn } from '@/lib/utils';

export interface FooterContainerProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
}

export const Container = ({
  children,
  className,
  ...props
}: FooterContainerProps) => {
  return (
    <div className={cn('py-8', className)} {...props}>
      {children}
    </div>
  );
};
