import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
} & React.ComponentPropsWithoutRef<'div'>;

export const MenuContainer = ({ children, title, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h5 className="h-8 font-medium">{title}</h5>
      <div className="font-body text-xs leading-6" {...props}>
        {children}
      </div>
    </div>
  );
};
