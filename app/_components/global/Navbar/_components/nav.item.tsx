import type { Menu as MenuType } from '@/types';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  NavLink,
  NestedNavLink,
} from '@/app/_components/global/Navbar/_components/nav.link';
import { CaretDown } from '@phosphor-icons/react';

const NavItem = ({ item }: { item: MenuType }) => {
  const [open, setOpen] = React.useState(false);

  const parent = item.displayList ? item.title : '';

  return item.displayList ? (
    <div
      id="NavItem"
      className="group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id="nav-item__trigger"
        className="flex items-center text-charcoal"
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
          'fixed inset-0 -z-[2] h-screen w-screen bg-black/50 transition-all duration-300 ease-in-out',
          open ? 'opacity-50' : 'hidden opacity-0'
        )}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(false)}
      />
      <Content open={open} setOpen={setOpen} item={item} parent={parent} />
    </div>
  ) : (
    <NavLink navItem={item.items} title={item.title} />
  );
};

const Content = ({
  open = false,
  setOpen,
  item,
  parent,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: MenuType;
  parent: string;
}) => {
  return (
    <div
      id="nav-item__content"
      className={cn(
        'absolute left-0 top-0 -z-[1] w-screen bg-anti-flash px-4 pb-6 pt-20 transition-transform duration-300 ease-default',
        open ? 'animate-navContentDown' : 'animate-navContentUp'
      )}
    >
      <div className="grid grid-cols-4">
        <ul className="col-start-3 flex flex-col gap-y-4">
          {item.itemsList.items.map((item, index) => (
            <NestedNavLink
              key={index}
              navItem={item}
              title={item.name}
              parent={parent}
              setOpen={setOpen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavItem;
