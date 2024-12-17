import { Icon as IconType } from '@/types/generics';
import React from 'react';
import {
  Check,
  CheckCircle,
  Clock,
  Eye,
  Headphones,
  Rocket,
} from '@phosphor-icons/react';

export type IconsProps = IconType & React.HTMLAttributes<HTMLOrSVGElement>;

export const Icon = (props: IconsProps): React.ReactNode => {
  switch (props.type) {
    case 'eye':
      return <Eye {...props} />;
    case 'rocket':
      return <Rocket {...props} />;
    case 'clock':
      return <Clock {...props} />;
    case 'headphones':
      return <Headphones {...props} />;
    case 'check':
      return <Check {...props} />;
    case 'check-circle':
      return <CheckCircle {...props} />;
  }
};
