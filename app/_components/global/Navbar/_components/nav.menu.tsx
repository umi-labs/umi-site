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
    'bg-primary-secondary-accent h-[calc(100vh-80px)] w-full fixed bottom-0 inset-x-0 overflow-hidden z-[90] transition-transform duration-300 ease-in-out'
  ),
  closed: cn('translate-x-[100%]'),
  innerClosed: cn('translate-x-[-100%]'),
};

export default function Menu({ data, show, setShow }: MenuProps) {
  React.useEffect(() => {
    /* document.body.style.overflowY = show ? "hidden" : "scroll"; */
  }, [show]);

  const menu = data?.mainNav?.menu || ([] as MenuType[]);

  const [history, setHistory] = React.useState<any[]>([]);

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

  React.useEffect(() => {
    if (!show) {
      setHistory([]);
    }
  }, [show]);

  const handleDrilldown = (item) => {
    setHistory([...history, item]);
  };

  const handleDrillup = () => {
    setHistory(history.slice(0, -1));
  };

  const currentMenu = history[history.length - 1];

  return (
    <div
      id="mobile-menu"
      className={cn(MenuStyles.default, !show && MenuStyles.closed)}
    >
      <div
        className={cn(
          'absolute inset-0 transition-transform duration-300 ease-in-out',
          {
            'translate-x-[-100%]': history.length > 0,
          }
        )}
      >
        <div className="grid h-full grid-rows-[1fr_auto] items-start p-8 uppercase">
          <ul className="ml-0 flex list-none flex-col gap-y-3 divide-y">
            {menu.map((item, key) => (
              <MenuItem
                key={key}
                item={item}
                setShow={setShow}
                onDrilldown={handleDrilldown}
              />
            ))}
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
      </div>
      {currentMenu && (
        <div
          className={cn(
            'absolute inset-0 bg-primary-secondary-accent transition-transform duration-300 ease-in-out'
          )}
        >
          <SubMenu
            item={currentMenu}
            onDrillup={handleDrillup}
            onDrilldown={handleDrilldown}
            setShow={setShow}
            level={history.length}
          />
        </div>
      )}
    </div>
  );
}

const SubMenu = ({ item, onDrillup, onDrilldown, setShow, level }) => {
  const items = item.nav || item.navLinks || [];
  const [history, setHistory] = React.useState<any[]>([]);

  const handleDrilldown = (item) => {
    setHistory([...history, item]);
  };

  const handleDrillup = () => {
    setHistory(history.slice(0, -1));
  };
  
  const currentSubMenu = history[history.length - 1];

  if(currentSubMenu) {
    return (
        <div className='bg-primary-secondary-accent h-full'>
             <SubMenu item={currentSubMenu} onDrillup={handleDrillup} onDrilldown={onDrilldown} setShow={setShow} level={level + 1} />
        </div>
    )
  }

  return (
    <div className='p-8 uppercase h-full grid grid-rows-[auto_1fr]'>
      <div className="flex w-full items-center justify-between border-b pb-3">
        <CaretLeft
          className="size-4 hover:cursor-pointer"
          onClick={onDrillup}
        />
        <p className="mb-0 font-medium capitalize text-[21px]">{item.title}</p>
        <div />
      </div>
      <ul className="ml-0 flex w-full list-none flex-col gap-y-3 divide-y pt-3">
        {items.map((subItem, index) => {
          if (subItem.title && subItem.navLinks) {
            return (
              <li key={index} className="pt-3">
                <button
                  className="text-charcoal flex w-full items-center justify-between overflow-hidden uppercase"
                  onClick={() => handleDrilldown(subItem)}
                >
                  <p className="capitalize prose font-medium w-fit mb-0">
                    {subItem.title}
                  </p>
                  <CaretRight className={cn('ml-2 h-4 w-4')} />
                </button>
              </li>
            );
          }
          const linkItem = subItem.navLinks ? subItem.navLinks[0] : subItem;
          return (
            <li key={index} className="pt-3">
              <MenuLink navItem={linkItem} title={linkItem.title} setShow={setShow} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const MenuItem = ({ item, setShow, onDrilldown }) => {
  if (item.subNavigation !== 'none') {
    return (
      <li className="pt-3">
        <button
          className="text-charcoal flex w-full items-center justify-between overflow-hidden uppercase"
          onClick={() => onDrilldown(item)}
        >
          <p className="capitalize prose font-medium w-fit mb-0">
            {item.title}
          </p>
          <CaretRight className={cn('ml-2 h-4 w-4')} />
        </button>
      </li>
    );
  }

  return (
    <li className="pt-3">
      <MenuLink
        navItem={item.nav}
        title={item.title}
        setShow={setShow}
      />
    </li>
  );
};

const MenuLink = ({
  navItem,
  title,
  setShow,
}: {
  navItem: NavItem;
  title: string;
  setShow: any;
}) => {
  return (
    <Link
      link={navItem}
      variant="link"
      className={cn(
        'text-charcoal uppercase md:text-base w-full items-start justify-start text-start'
      )}
      onClick={() => setShow(false)}
    >
      <p className="capitalize prose font-medium w-fit mb-0">{title}</p>
    </Link>
  );
};
