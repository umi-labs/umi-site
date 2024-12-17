import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex interactable items-center font-medium justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-foreground border border-primary-foreground text-primary-background shadow hover:bg-primary-background w-fit hover:text-primary-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-primary-foreground text-primary-foreground bg-primary-background shadow-sm hover:bg-primary-foreground hover:text-primary-background',
        secondary:
          'bg-primary-background border border-primary-background text-primary-foreground shadow hover:bg-primary-foreground w-fit hover:text-primary-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-xs text-gray-500 transition-all duration-300 ease-in-out hocus:text-gray-900 hocus:underline underline-offset-4',
        'link-external':
          "text-zinc-900 hocus:text-zinc-700 after:content-['_↗']",
        'link-interactive': 'text-zinc-900 hocus:text-zinc-700 interactable',
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
