import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex interactable items-center font-medium justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#368DB1]/50 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white border border-[#368DB1] shadow-lg hover:from-[#313E4E] hover:to-[#368DB1] hover:scale-105 hover:shadow-xl active:scale-95 w-fit',
        destructive:
          'bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:scale-105 hover:shadow-xl active:scale-95',
        outline:
          'border-2 border-[#368DB1] text-[#368DB1] bg-transparent shadow-sm hover:bg-[#368DB1] hover:text-white hover:scale-105 hover:shadow-lg active:scale-95',
        secondary:
          'bg-gradient-to-r from-[#313E4E] to-[#313E4E] text-white border border-[#313E4E] shadow-lg hover:from-[#368DB1] hover:to-[#368DB1] hover:scale-105 hover:shadow-xl active:scale-95 w-fit',
        ghost: 
          'text-[#313E4E] hover:bg-[#B0DEE6]/10 hover:text-[#368DB1] hover:scale-105 active:scale-95',
        link: 
          'text-[#368DB1] transition-all duration-300 ease-in-out hover:text-[#313E4E] hover:underline underline-offset-4 hover:scale-105',
        'link-external':
          "text-[#368DB1] hover:text-[#313E4E] after:content-['_↗'] hover:scale-105 transition-transform duration-200",
        'link-interactive': 
          'text-[#313E4E] hover:text-[#368DB1] interactable hover:scale-105 transition-transform duration-200',
        'link-light':
          'text-white hover:text-[#B0DEE6] hover:underline underline-offset-4 hover:scale-105 transition-transform duration-200',
        'gradient':
          'bg-gradient-to-r from-[#368DB1] via-[#B0DEE6] to-[#FFE48C] text-[#313E4E] border-0 shadow-lg hover:from-[#FFE48C] hover:via-[#B0DEE6] hover:to-[#368DB1] w-fit hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300',
        'bounce':
          'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white border border-[#368DB1] shadow-lg hover:from-[#313E4E] hover:to-[#368DB1] w-fit hover:scale-110 hover:shadow-xl active:scale-95 hover:animate-bounce',
        'glow':
          'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white border border-[#368DB1] shadow-lg hover:from-[#313E4E] hover:to-[#368DB1] w-fit hover:scale-105 hover:shadow-2xl hover:shadow-[#368DB1]/25 active:scale-95',
        'shimmer':
          'bg-gradient-to-r from-[#368DB1] via-[#B0DEE6] to-[#FFE48C] text-[#313E4E] border-0 shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 button-shimmer',
        'pulse':
          'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white border border-[#368DB1] shadow-lg hover:from-[#313E4E] hover:to-[#368DB1] w-fit hover:scale-105 hover:shadow-xl active:scale-95 button-pulse',
        'enhanced':
          'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white border border-[#368DB1] shadow-lg hover:from-[#313E4E] hover:to-[#368DB1] w-fit hover:scale-105 hover:shadow-xl active:scale-95 button-enhanced',
        'umi-primary':
          'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white border border-[#368DB1] shadow-lg hover:from-[#313E4E] hover:to-[#368DB1] w-fit hover:scale-105 hover:shadow-xl active:scale-95',
        'umi-secondary':
          'bg-gradient-to-r from-[#B0DEE6] to-[#B0DEE6] text-[#313E4E] border border-[#B0DEE6] shadow-lg hover:from-[#368DB1] hover:to-[#368DB1] hover:text-white w-fit hover:scale-105 hover:shadow-xl active:scale-95',
        'umi-accent':
          'bg-gradient-to-r from-[#FFE48C] to-[#ECCD7F] text-[#313E4E] border border-[#FFE48C] shadow-lg hover:from-[#368DB1] hover:to-[#368DB1] hover:text-white w-fit hover:scale-105 hover:shadow-xl active:scale-95',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10 rounded-lg',
        link: 'w-fit h-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
