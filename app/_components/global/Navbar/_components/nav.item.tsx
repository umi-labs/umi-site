import type { Menu as MenuType } from '@/types/components/nav';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  NavLink,
  NestedNavLink,
} from '@/app/_components/global/Navbar/_components/nav.link';
import { CaretDown } from '@phosphor-icons/react';

interface NavItemProps {
  item: MenuType;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
  currentItem: string | null;
}

const NavItem = ({ item, setCurrentItem, currentItem }: NavItemProps) => {
  return item.displayList ? (
    <div id="NavItem" className="group">
      <button
        id="nav-item__trigger"
        className="interactable z-10 flex items-center text-xs font-medium capitalize text-charcoal transition-all duration-300 ease-in-out hocus:text-gray-900"
        onClick={() => setCurrentItem(item._key)}
        onMouseEnter={() => setCurrentItem(item._key)}
        onMouseLeave={() => setCurrentItem(null)}
      >
        <span>{item.title}</span>
        <CaretDown
          weight="bold"
          className={cn(
            'ml-2 size-4 transition-transform duration-300 ease-in-out',
            currentItem === item._key && '-rotate-180'
          )}
        />
      </button>
      <Content
        setCurrentItem={setCurrentItem}
        currentItem={currentItem}
        item={item}
      />
      <div
        className={cn(
          'fixed inset-0 -z-20 h-screen w-screen bg-black/50 transition-all duration-300 ease-in-out',
          currentItem === item._key ? 'opacity-50' : 'hidden opacity-0'
        )}
        onClick={() => setCurrentItem(null)}
        onMouseEnter={() => {
          setTimeout(() => {
            if (currentItem !== item._key) setCurrentItem(null);
          }, 100);
        }}
      />
    </div>
  ) : (
    <NavLink navItem={item.items} title={item.title} />
  );
};

const Content = ({
  setCurrentItem,
  currentItem,
  item,
}: {
  currentItem: string | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
  item: MenuType;
}) => {
  return (
    <div
      id="nav-item__content"
      className={cn(
        'absolute left-0 top-0 -z-[1] w-screen bg-anti-flash px-4 pb-6 pt-20 capitalize transition-transform duration-300 ease-default',
        currentItem === item._key
          ? 'animate-navContentDown'
          : 'animate-navContentUp'
      )}
      onMouseEnter={() => setCurrentItem(item._key)}
    >
      <div className="grid grid-cols-4">
        <ul className="col-start-3 flex flex-col gap-y-4">
          {item.itemsList.items.map((item, index) => (
            <NestedNavLink
              key={index}
              navItem={item}
              title={item.name}
              setCurrentItem={setCurrentItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavItem;
