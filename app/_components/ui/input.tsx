import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'file:text-foreground flex h-12 w-full rounded-xl border-2 border-[#B0DEE6]/30 bg-white/90 backdrop-blur-sm px-4 py-3 text-base font-medium shadow-lg transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#313E4E]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#368DB1]/50 focus-visible:border-[#368DB1] hover:border-[#368DB1]/50 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
