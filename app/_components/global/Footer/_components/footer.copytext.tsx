import React from 'react';

export const CopyText = ({
  text = 'All Rights Reserved',
  name = 'Umi Digital',
}: {
  text?: string;
  name?: string;
}) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  return (
    <p className="text-xs leading-6">
      © {year} {name}. {text}.
    </p>
  );
};
