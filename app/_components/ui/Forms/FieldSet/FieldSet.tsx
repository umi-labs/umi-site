import clsx from 'clsx';

import { FIELDSET_TYPE } from './type';

export default function FIELDSET({
  id,
  name,
  classNames,
  children,
  ...props
}: FIELDSET_TYPE) {
  return (
    <fieldset
      id={id}
      name={name}
      className={clsx(
        'w-full space-y-2',
        classNames
      )}
      {...props}
    >
      <label htmlFor={id} className="block text-sm font-semibold text-[#313E4E] mb-2">
        {name}
      </label>
      {children}
    </fieldset>
  );
}
