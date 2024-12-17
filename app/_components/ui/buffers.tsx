import React from 'react';

interface Props {
  visible?: boolean;
}

export function TopBuffer({ visible = true }: Props) {
  return (
    visible && (
      <TopWave className="absolute inset-x-0 top-0 flex-shrink -translate-y-full" />
    )
  );
}

export function BottomBuffer({ visible = true }: Props) {
  return (
    visible && (
      <BottomWave className="absolute inset-x-0 bottom-0 flex-shrink translate-y-full" />
    )
  );
}

const TopWave = (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="80"
      viewBox="0 0 1440 80"
      fill="none"
      {...props}
    >
      <path
        d="M520.766 0.0367299C390.85 0.842498 119.457 31.0367 0 46.0367V109.037H1440V86.0367C1185.38 80.0209 846.57 -1.98399 520.766 0.0367299Z"
        fill="#313E4E"
        className="w-full"
      />
    </svg>
  );
};

const BottomWave = (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      width="1440"
      height="110"
      viewBox="0 0 1440 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M919.234 109.037C1049.15 108.232 1320.54 78.0374 1440 63.0374L1440 0.037117L9.53231e-06 0.0369911L7.52157e-06 23.0372C254.619 29.0531 593.43 111.058 919.234 109.037Z"
        fill="#313E4E"
        className="w-full"
      />
    </svg>
  );
};
