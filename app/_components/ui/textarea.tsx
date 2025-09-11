import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded-xl border-2 border-[#B0DEE6]/30 bg-white/90 backdrop-blur-sm px-4 py-3 text-base font-medium shadow-lg transition-all duration-300 placeholder:text-[#313E4E]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#368DB1]/50 focus-visible:border-[#368DB1] hover:border-[#368DB1]/50 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
