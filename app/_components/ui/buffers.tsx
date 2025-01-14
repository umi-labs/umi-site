import React from 'react';
import { cn } from '@/app/_utils';

interface Props {
  visible?: boolean;
  colour?: 'blue' | 'grey';
  className?: React.HTMLAttributes<HTMLOrSVGElement>['className'];
}

export function TopBuffer({
  visible = true,
  colour = 'blue',
  className,
  ...props
}: Props) {
  return (
    visible && (
      <TopWave
        className={cn(
          'absolute inset-x-0 top-0 flex w-full max-w-7xl flex-shrink -translate-y-full',
          className
        )}
        colour={colour}
        {...props}
      />
    )
  );
}

export function BottomBuffer({
  visible = true,
  colour = 'blue',
  className,
  ...props
}: Props) {
  return (
    visible && (
      <BottomWave
        className={cn(
          'absolute inset-x-0 bottom-0 flex w-full max-w-7xl flex-shrink translate-y-full',
          className
        )}
        colour={colour}
        {...props}
      />
    )
  );
}

const COLORS = [
  { id: 'blue', hex: '#313E4E' },
  { id: 'grey', hex: '#FAFAFA' },
];

type WaveProps = React.HTMLAttributes<HTMLOrSVGElement> & {
  colour?: 'blue' | 'grey';
};

const TopWave = ({ colour, ...props }: WaveProps) => {
  return (
    <svg
      width="1280"
      height="100"
      viewBox="0 0 1280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M520.766 0.0738393C390.85 0.879608 119.457 31.0738 0 46.0738V109.074H1440V86.0738C1185.38 80.058 846.57 -1.94688 520.766 0.0738393Z"
        fill={COLORS.find((c) => c.id === colour)?.hex}
        className="h-full w-full"
      />
    </svg>
  );
};

const BottomWave = ({ colour, ...props }: WaveProps) => {
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
        d="M919.234 109.075C1049.15 108.269 1320.54 78.0746 1440 63.0746L1440 0.0743637L9.53231e-06 0.0742378L7.52157e-06 23.0745C254.619 29.0903 593.43 111.095 919.234 109.075Z"
        fill={COLORS.find((c) => c.id === colour)?.hex}
        className="h-full w-full"
      />
    </svg>
  );
};
