import type { Menu as MenuType } from '@/types/components/nav';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  NavLink,
  NestedNavLink,
} from '@/app/_components/global/Navbar/_components/nav.link';
import { CaretDown } from '@phosphor-icons/react';

const NavItem = ({ item }: { item: MenuType }) => {
  const [open, setOpen] = React.useState(false);

  return item.displayList ? (
    <div id="NavItem" className="group" onMouseEnter={() => setOpen(true)}>
      <button
        id="nav-item__trigger"
        className="flex items-center text-xs font-medium capitalize text-charcoal transition-all duration-300 ease-in-out hocus:text-gray-900"
        onClick={() => setOpen(!open)}
      >
        <span>{item.title}</span>
        <CaretDown
          weight="bold"
          className={cn(
            'ml-2 size-4 transition-transform duration-300 ease-in-out',
            open && '-rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'fixed inset-0 -z-10 h-screen w-screen bg-black/50 transition-all duration-300 ease-in-out',
          open ? 'opacity-50' : 'hidden opacity-0'
        )}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(false)}
      />
      <Content open={open} setOpen={setOpen} item={item} />
    </div>
  ) : (
    <NavLink navItem={item.items} title={item.title} />
  );
};

const Content = ({
  open = false,
  setOpen,
  item,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: MenuType;
}) => {
  return (
    <div
      id="nav-item__content"
      className={cn(
        'absolute left-0 top-0 -z-[1] w-screen bg-anti-flash px-4 pb-6 pt-20 capitalize transition-transform duration-300 ease-default',
        open ? 'animate-navContentDown' : 'animate-navContentUp'
      )}
      onMouseEnter={() => setOpen(true)}
    >
      <div className="grid grid-cols-4">
        <ul className="col-start-3 flex flex-col gap-y-4">
          {item.itemsList.items.map((item, index) => (
            <NestedNavLink
              key={index}
              navItem={item}
              title={item.name}
              setOpen={setOpen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavItem;
