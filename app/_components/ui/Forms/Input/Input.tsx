import clsx from 'clsx';

import { INPUT_TYPE } from './type';

export default function INPUT({
  id,
  name,
  type = 'text',
  value,
  onChange,
  classNames,
  register,
  ...props
}: INPUT_TYPE) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={clsx(
        'w-full h-12 rounded-xl border-2 border-[#B0DEE6]/30 bg-white/90 backdrop-blur-sm px-4 py-3 text-base font-medium text-[#313E4E] shadow-lg transition-all duration-300 placeholder:text-[#313E4E]/60 focus:outline-none focus:ring-2 focus:ring-[#368DB1]/50 focus:border-[#368DB1] hover:border-[#368DB1]/50 hover:shadow-xl',
        classNames
      )}
      {...register(id)}
      {...props}
    />
  );
}
