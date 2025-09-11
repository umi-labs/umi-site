import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex interactable items-center font-medium justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-foreground border border-primary-foreground text-primary-background shadow-lg hover:bg-transparent w-fit hover:text-primary-foreground hover:scale-105 hover:shadow-xl active:scale-95',
        destructive:
          'bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:scale-105 hover:shadow-xl active:scale-95',
        outline:
          'border border-primary-foreground text-primary-foreground bg-transparent shadow-sm hover:bg-primary-foreground hover:text-primary-background hover:scale-105 hover:shadow-lg active:scale-95',
        secondary:
          'bg-primary-background border border-primary-background text-primary-foreground shadow-lg hover:bg-primary-foreground w-fit hover:text-primary-background hover:scale-105 hover:shadow-xl active:scale-95',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95',
        link: 'text-xs text-gray-500 transition-all duration-300 ease-in-out hocus:text-gray-900 hocus:underline underline-offset-4 hover:scale-105',
        'link-external':
          "text-zinc-900 hocus:text-zinc-700 after:content-['_↗'] hover:scale-105 transition-transform duration-200",
        'link-interactive': 'text-zinc-900 hocus:text-zinc-700 interactable hover:scale-105 transition-transform duration-200',
        'link-light':
          'text-zinc-100 hocus:text-zinc-200 hocus:underline underline-offset-4 hover:scale-105 transition-transform duration-200',
        'gradient':
          'bg-gradient-to-r from-primary-foreground to-primary-accent text-primary-background border border-primary-foreground shadow-lg hover:from-primary-accent hover:to-primary-foreground w-fit hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300',
        'bounce':
          'bg-primary-foreground border border-primary-foreground text-primary-background shadow-lg hover:bg-transparent w-fit hover:text-primary-foreground hover:scale-110 hover:shadow-xl active:scale-95 hover:animate-bounce',
        'glow':
          'bg-primary-foreground border border-primary-foreground text-primary-background shadow-lg hover:bg-transparent w-fit hover:text-primary-foreground hover:scale-105 hover:shadow-2xl hover:shadow-primary-foreground/25 active:scale-95',
        'shimmer':
          'button-gradient text-white border-0 shadow-lg hover:scale-105 hover:shadow-xl active:scale-95',
        'pulse':
          'bg-primary-foreground border border-primary-foreground text-primary-background shadow-lg hover:bg-transparent w-fit hover:text-primary-foreground button-pulse hover:scale-105 hover:shadow-xl active:scale-95',
        'enhanced':
          'bg-primary-foreground border border-primary-foreground text-primary-background shadow-lg hover:bg-transparent w-fit hover:text-primary-foreground hover:scale-105 hover:shadow-xl active:scale-95 button-enhanced',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
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
