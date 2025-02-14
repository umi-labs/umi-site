'use client';

import { CaretRight } from '@phosphor-icons/react';
import React from 'react';

import Link from '@/app/_components/ui/link';
import { cn } from '@/lib/utils';
import type { Menu as MenuType, NavItem } from '@/types/components/nav';
import type { SettingsPayload } from '@/types';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr';

interface MenuProps {
  show: boolean;
  setShow: any;
  data: SettingsPayload;
}

const MenuStyles = {
  default: cn(
    'bg-primary-secondary-accent h-[calc(100vh-80px)] w-full fixed bottom-0 inset-x-0 overflow-hidden z-[90] transition-all translate-x-0 shadow-md duration-[800ms] ease-in-out'
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

  const [subMenu, setSubMenu] = React.useState<{
    show: boolean;
    currentItem: MenuType | null;
  }>({
    show: false,
    currentItem: null,
  });

  return (
    <>
      <div className={cn(MenuStyles.default, !show && MenuStyles.closed)}>
        {show && (
          <div className="col-span-3 grid h-full w-full grid-rows-2 items-start p-8 uppercase">
            <ul className="ml-0 flex list-none flex-col gap-y-3 divide-y">
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
            {data.mainNav?.ctaButton && (
              <Link
                href={data.mainNav.ctaButton.url}
                variant="default"
                size="default"
                className="mt-8 w-full"
              >
                {data.mainNav.ctaButton.text}
              </Link>
            )}
          </div>
        )}
      </div>
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
    currentItem: MenuType | null;
  };
}) => {
  React.useEffect(() => {
    setSubMenu({ show: false, currentItem: null });
  }, [item]);

  return item.subNavigation !== 'none' ? (
    <div className="relative h-full w-full overflow-hidden">
      <button
        className="text-charcoal w-full overflow-hidden uppercase"
        onClick={() => {
          setSubMenu({
            currentItem: item,
            show: !subMenu.show,
          });
        }}
      >
        <h2
          className={cn(
            'mt-3 flex items-center justify-between text-xl underline-offset-4 hover:underline md:text-4xl',
            subMenu.show ? 'animate-rotateDownAndOut' : 'animate-rotateUpAndIn'
          )}
        >
          {item.title}
          <CaretRight className={cn('ml-2 h-8 w-8')} />
        </h2>
      </button>
      <div
        className={cn(MenuStyles.default, !subMenu.show && MenuStyles.closed)}
      >
        <div className="col-span-3 flex h-full w-full flex-col items-start p-8 uppercase">
          <div
            className={cn(
              'flex w-full items-center justify-between border-b pb-3'
            )}
          >
            <CaretLeft
              className="size-8 hover:cursor-pointer"
              onClick={() => setSubMenu({ show: false, currentItem: null })}
            />
            <h2 className="">{subMenu?.currentItem?.title}</h2>
            <div />
          </div>
          <ul className="ml-0 flex w-full list-none flex-col gap-y-3 divide-y">
            {subMenu?.currentItem?.subNavigation !== 'none' &&
              subMenu?.currentItem?.nav?.map((item, index) => {
                let delay = index * 100;
                return (
                  <div
                    key={index}
                    className={cn(
                      `pt-3 duration-300 ease-in-out md:transition-all`,
                      subMenu.show ? 'md:translate-x-0' : 'md:translate-x-full'
                    )}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <MenuLink
                      navItem={item}
                      title={item.title}
                      setShow={setShow}
                      show={show}
                    />
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="overflow-hidden pt-3">
      <div
        className={cn(
          subMenu && subMenu.show
            ? 'animate-rotateDownAndOut'
            : 'animate-rotateUpAndIn'
        )}
      >
        <MenuLink
          navItem={item.nav}
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
  navItem: NavItem;
  title: string;
  show: boolean;
  setShow: any;
}) => {
  return (
    <Link
      // @ts-ignore
      link={navItem}
      className={cn(
        'text-charcoal animate-rotateUpAndIn uppercase md:text-base'
      )}
      onClick={() => setShow(!show)}
    >
      <h2 className="text-xl md:text-4xl">{title}</h2>
    </Link>
  );
};
