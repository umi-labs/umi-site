'use client';

import { CaretRight } from '@phosphor-icons/react';
import React from 'react';

import Link from '@/app/_components/ui/link';
import { cn } from '@/lib/utils';
import type {
  Menu as MenuType,
  NavItem as NavItemType,
} from '@/types/components/nav';
import type { SettingsPayload } from '@/types';

interface MenuProps {
  show: boolean;
  setShow: any;
  data: SettingsPayload;
}

const MenuStyles = {
  default: cn(
    'bg-anti-flash h-[100svh] w-full fixed top-0 right-0 overflow-hidden z-[90] transition-all translate-x-0 shadow-md duration-[800ms] ease-in-out'
  ),
  closed: cn('-translate-x-[-100%] shadow-none'),
};

export default function Menu({ data, show, setShow }: MenuProps) {
  React.useEffect(() => {
    /* document.body.style.overflowY = show ? "hidden" : "scroll"; */
  }, [show]);

  const menu = data?.mainNav?.menu || ([] as MenuType[]);

  React.useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Escape' && show) {
        event.preventDefault();

        setShow(!show);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [show, setShow]);

  const [subMenu, setSubMenu] = React.useState({
    show: false,
    currentItem: null,
  });

  return (
    <>
      <div className={cn(MenuStyles.default, !show && MenuStyles.closed)}>
        {show && (
          <div className="col-span-3 grid h-full w-full grid-rows-2 items-start p-8 uppercase">
            <h2 className="mt-4 flex items-end justify-start text-start text-8xl md:mt-0 md:text-[12rem]">
              Menu
            </h2>
            <ul className="ml-0 flex list-none flex-col gap-y-3">
              {menu &&
                menu.map((menuItem, key) => {
                  return (
                    <NavItem
                      key={key}
                      show={show}
                      setShow={setShow}
                      setSubMenu={setSubMenu}
                      subMenu={subMenu}
                      item={menuItem}
                    />
                  );
                })}
            </ul>
          </div>
        )}
      </div>
      {show && (
        <div
          onClick={() => setShow(!show)}
          className="absolute left-0 top-0 z-[89] h-screen w-screen overflow-hidden bg-primary-background opacity-30"
        />
      )}
    </>
  );
}

const NavItem = ({
  item,
  show,
  setShow,
  setSubMenu,
  subMenu,
}: {
  item: MenuType;
  show: boolean;
  setShow: any;
  setSubMenu: any;
  subMenu: {
    show: boolean;
    currentItem: any;
  };
}) => {
  React.useEffect(() => {
    setSubMenu({ show: false, currentItem: null });
  }, [item]);

  return item.displayList ? (
    <div className="relative h-full w-full">
      <button
        className="w-full overflow-hidden uppercase text-charcoal md:w-1/2"
        onClick={() => {
          setSubMenu({
            currentItem: item._key,
            show: !subMenu.show,
          });
        }}
      >
        <h2
          className={cn(
            'flex items-center justify-start',
            subMenu.show && subMenu.currentItem !== item._key
              ? 'animate-rotateDownAndOut'
              : 'animate-rotateUpAndIn'
          )}
        >
          {item.title}
          <CaretRight
            className={cn(
              'ml-2 h-8 w-8 transition-transform duration-300 ease-in-out',
              subMenu.show && 'rotate-90'
            )}
          />
        </h2>
      </button>
      <div
        className={cn(
          'absolute bottom-0 right-0 w-full rounded-sm border-0 bg-anti-flash outline-0 ring-0 md:top-0 md:w-1/2',
          `transition-transform duration-300 ease-in-out md:transition-none`,
          subMenu.show
            ? 'translate-y-full md:translate-y-0'
            : 'translate-y-[200vw] md:translate-y-0'
        )}
      >
        <ul className="flex w-full min-w-[100px] flex-col gap-y-4 whitespace-nowrap border-0 text-right first-of-type:mt-6 md:first-of-type:mt-0">
          {item.itemsList.items.map((item, index) => {
            let delay = index * 100;
            return (
              <div
                key={index}
                className={cn(
                  `duration-300 ease-in-out md:transition-all`,
                  subMenu.show ? 'md:translate-x-0' : 'md:translate-x-full'
                )}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <MenuLink
                  navItem={item}
                  title={item.name}
                  setShow={setShow}
                  show={show}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  ) : (
    <div className="overflow-hidden">
      <div
        className={cn(
          subMenu && subMenu.show && subMenu.currentItem !== item._key
            ? 'animate-rotateDownAndOut'
            : 'animate-rotateUpAndIn'
        )}
      >
        <MenuLink
          navItem={item.items}
          show={show}
          setShow={setShow}
          title={item.title}
        />
      </div>
    </div>
  );
};

const MenuLink = ({
  navItem,
  title,
  show,
  setShow,
}: {
  navItem: NavItemType;
  title: string;
  show: boolean;
  setShow: any;
}) => {
  return (
    <Link
      // @ts-ignore
      link={navItem}
      className={cn('animate-rotateUpAndIn uppercase text-charcoal')}
      onClick={() => setShow(!show)}
    >
      <h2>{title}</h2>
    </Link>
  );
};
