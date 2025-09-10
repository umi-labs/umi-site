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
    'bg-primary-secondary-accent h-[calc(100vh-80px)] w-full fixed bottom-0 inset-x-0 overflow-hidden z-[90] transition-all duration-500 ease-out'
  ),
  closed: cn('translate-x-[100%] opacity-0'),
  innerClosed: cn('translate-x-[-100%]'),
};

export default function Menu({ data, show, setShow }: MenuProps) {
  React.useEffect(() => {
    /* document.body.style.overflowY = show ? "hidden" : "scroll"; */
  }, [show]);

  const menu = data?.mainNav?.menu || ([] as MenuType[]);

  const [history, setHistory] = React.useState<any[]>([]);
  const [itemsVisible, setItemsVisible] = React.useState<boolean[]>([]);

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
      setItemsVisible([]);
    } else {
      // Trigger sequential animations
      const timeouts: NodeJS.Timeout[] = [];
      menu.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setItemsVisible(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 150);
        timeouts.push(timeout);
      });
      
      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [show, menu]);

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
          'absolute inset-0 transition-all duration-500 ease-out',
          {
            'translate-x-[-100%] opacity-0': history.length > 0,
          }
        )}
      >
        <div className="grid h-full grid-rows-[1fr_auto] items-start px-8 pt-16 pb-8 uppercase animate-in fade-in-0 duration-300">
          <ul className="ml-0 flex list-none flex-col gap-y-2 divide-y divide-gray-200/50">
            {menu.map((item, key) => (
              <div
                key={key}
                className={`transition-all duration-300 ease-out ${
                  itemsVisible[key] 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-4'
                }`}
              >
                <MenuItem
                  item={item}
                  setShow={setShow}
                  onDrilldown={handleDrilldown}
                />
              </div>
            ))}
          </ul>
          {data.mainNav?.ctaButton && (
            <div
              className="opacity-0 translate-y-4"
              style={{ 
                animation: `slideInFromBottom 300ms ease-out ${menu.length * 150 + 200}ms forwards`
              }}
            >
              <Link
                href={data.mainNav.ctaButton.url}
                variant="default"
                size="default"
                className="mt-8 w-full"
              >
                {data.mainNav.ctaButton.text}
              </Link>
            </div>
          )}
        </div>
      </div>
      {currentMenu && (
        <div
          className={cn(
            'absolute inset-0 bg-primary-secondary-accent transition-all duration-500 ease-out animate-in slide-in-from-right-4 fade-in-0'
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
  const [itemsVisible, setItemsVisible] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    // Trigger sequential animations for submenu items
    const timeouts: NodeJS.Timeout[] = [];
    items.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setItemsVisible(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 150);
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [items]);

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
    <div className='px-8 pt-16 pb-8 uppercase h-full grid grid-rows-[auto_1fr]'>
      <div className="flex w-full items-center justify-start gap-3 pb-3 animate-in slide-in-from-top-2 fade-in-0">
        <button
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:translate-x-[-4px]"
          onClick={onDrillup}
        >
          <CaretLeft className="size-4 hover:cursor-pointer" />
        </button>
        <span className="text-sm font-medium text-gray-700 capitalize">
          {item.title}
        </span>
      </div>
      <ul className="ml-0 flex w-full list-none flex-col gap-y-2 pt-3">
        {items.map((subItem, index) => {
          if (subItem.title && subItem.navLinks) {
            return (
              <li key={index} className={`group ${index > 0 ? 'border-t border-gray-200/50 pt-3' : 'pt-0'}`}>
                <div
                  className={`transition-all duration-300 ease-out ${
                    itemsVisible[index] 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-4'
                  }`}
                >
                  <button
                    className="text-charcoal flex w-full items-center justify-between overflow-hidden uppercase p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
                    onClick={() => handleDrilldown(subItem)}
                  >
                    <p className="capitalize prose font-medium w-fit mb-0 group-hover:text-primary-accent transition-colors duration-300">
                      {subItem.title}
                    </p>
                    <CaretRight className={cn('ml-2 h-4 w-4 group-hover:text-primary-accent group-hover:translate-x-1 transition-all duration-300')} />
                  </button>
                </div>
              </li>
            );
          }
          const linkItem = subItem.navLinks ? subItem.navLinks[0] : subItem;
          return (
            <li key={index} className={`group ${index > 0 ? 'border-t border-gray-200/50 pt-3' : 'pt-0'}`}>
              <div
                className={`transition-all duration-300 ease-out ${
                  itemsVisible[index] 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-4'
                }`}
              >
                <div className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2">
                  <MenuLink navItem={linkItem} title={linkItem.title} setShow={setShow} />
                </div>
              </div>
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
      <li className="pt-3 group">
        <button
          className="text-charcoal flex w-full items-center justify-between overflow-hidden uppercase p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
          onClick={() => onDrilldown(item)}
        >
          <p className="capitalize prose font-medium w-fit mb-0 group-hover:text-primary-accent transition-colors duration-300">
            {item.title}
          </p>
          <CaretRight className={cn('ml-2 h-4 w-4 group-hover:text-primary-accent group-hover:translate-x-1 transition-all duration-300')} />
        </button>
      </li>
    );
  }

  return (
    <li className="pt-3 group">
      <div className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2">
        <MenuLink
          navItem={item.nav}
          title={item.title}
          setShow={setShow}
        />
      </div>
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
        'text-charcoal uppercase md:text-base w-full items-start justify-start text-start group-hover:text-primary-accent transition-colors duration-300'
      )}
      onClick={() => setShow(false)}
    >
      <p className="capitalize prose font-medium w-fit mb-0 group-hover:translate-x-1 transition-transform duration-300">{title}</p>
    </Link>
  );
};
