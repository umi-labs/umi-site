'use client';

import type { Menu as MenuType } from '@/types/components/nav';
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import useResolvedHref from '@/app/_utils/hooks/useResolvedHref';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { cn } from '@/app/_utils';
import Link from 'next/link';
import useStringLimiter from '@/app/_utils/hooks/useStringLimiter';
import { CaretRightIcon } from '@radix-ui/react-icons';

const NavListItem = ({ navTitle, navItemsArray }) => {
  const isAbout = navTitle === "About";

  return isAbout ? (
    <div className="sm:w-auto sm:min-w-[200px]">
      <ul className={cn('m-0 grid list-none gap-4 px-4 py-3 ')}>
        {navItemsArray.map((item, i) =>
          item.navLinks?.map((element, index) => {
            const { title, description } = element;
            const desc = useStringLimiter(description, 50);
            const url = useResolvedHref({ link: element });

            return (
              <div key={`${i}-${index}`} className="Second">
                <ListItem title={title} href={url.href} />
              </div>
            );
          })
        )}
      </ul>
    </div>
  ) : (
    <ul
      className={cn(
        'm-0 grid list-none gap-8 px-[32px] py-[24px] sm:w-[728px] sm:grid-cols-3'
      )}
    >
      {navItemsArray.map((item, i) => (
        <li key={i} className="First">
          <h4 className="m-0 border-b-2 border-gray-200 pb-3 text-sm font-bold uppercase tracking-wide text-primary ">
            {item.title}
          </h4>
          <ul className="py-3">
            {item.navLinks?.map((element, index) => {
              const { title, description } = element;
              const desc = useStringLimiter(description, 50);
              const url = useResolvedHref({ link: element });

              return (
                <ListItem key={index} title={title} href={url.href} />
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

// Enhanced dropdown component for 3-level navigation
const EnhancedNavListItem = ({ navTitle, navItemsArray }) => {
  // Check if we have multiple categories (need columns) or just one
  const hasMultipleCategories = navItemsArray.length > 1;
  const gridCols = hasMultipleCategories ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1";
  const containerWidth = hasMultipleCategories ? "w-[800px]" : "w-[400px]";

  return (
    <div className={`${containerWidth} max-w-[90vw] p-6 animate-in fade-in-0 slide-in-from-top-2 duration-200`}>
      <div className={`grid ${gridCols} gap-8`}>
        {navItemsArray.map((item, i) => {
          // Check if this is a 2-level navigation (no navLinks, just direct links)
          const isTwoLevel = !item.navLinks || item.navLinks.length === 0;
          
          return (
            <div key={i} className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2 group-hover:border-primary-accent/30 transition-colors duration-200">
                {item.title}
              </h4>
              <ul className="space-y-2">
                {isTwoLevel ? (
                  // 2-level navigation - render direct links
                  item.nav?.map((element, index) => {
                    const { title, description } = element;
                    const desc = useStringLimiter(description, 80);
                    const url = useResolvedHref({ link: element });

                    return (
                      <li key={index}>
                        <Link
                          href={url.href}
                          className="group block p-2 rounded-lg hover:bg-primary-accent/5 transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-transparent group-hover:bg-primary-accent group-hover:scale-125 transition-all duration-200"></div>
                            <div className="text-sm font-medium text-gray-900 group-hover:text-primary-accent group-hover:translate-x-1 transition-all duration-200">
                              {title}
                            </div>
                          </div>
                          {description && (
                            <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-200 ml-3">{desc}</p>
                          )}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  // 3-level navigation - render navLinks
                  item.navLinks?.map((element, index) => {
                    const { title, description } = element;
                    const desc = useStringLimiter(description, 80);
                    const url = useResolvedHref({ link: element });

                    return (
                      <li key={index}>
                        <Link
                          href={url.href}
                          className="group block p-2 rounded-lg hover:bg-primary-accent/5 transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-transparent group-hover:bg-primary-accent group-hover:scale-125 transition-all duration-200"></div>
                            <div className="text-sm font-medium text-gray-900 group-hover:text-primary-accent group-hover:translate-x-1 transition-all duration-200">
                              {title}
                            </div>
                          </div>
                          {description && (
                            <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-200 ml-3">{desc}</p>
                          )}
                        </Link>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Nav = ({ menu }) => {
  const [activeMenu, setActiveMenu] = React.useState('');
  const lastActiveMenu = React.useRef<string>('');

  React.useEffect(() => {
    if (activeMenu) {
      lastActiveMenu.current = activeMenu;
    }
  }, [activeMenu]);

  return (
    <NavigationMenu.Root
      className="hidden lg:flex"
      value={activeMenu}
      onValueChange={setActiveMenu}
      delayDuration={100}
    >
      <NavigationMenu.List className="flex h-fit w-full items-center justify-center">
        {menu!.length > 0 &&
          menu!.map((item, i) => {
            const { title, subNavigation, detailed, nav } = item;
            return subNavigation === 'none' ? (
              <NavigationMenu.Item
                key={i}
                className="group flex select-none items-center justify-between px-4 py-2 text-xs font-medium leading-none text-black rounded-lg transition-all duration-200 hover:bg-primary-accent/10 hover:text-primary-accent"
              >
                <NavigationMenu.Link
                  href={
                    nav.hasParent && nav.parentSlug
                      ? `/${nav.parentSlug}/${nav.slug}`
                      : nav.type !== 'page'
                        ? `/${nav.type}/${nav.slug}`
                        : `/${nav.slug}`
                  }
                  className="transition-colors duration-200"
                >
                  {title}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={i} value={title}>
                <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-1 rounded-lg px-4 py-2 text-xs font-medium leading-none text-black outline-none transition-all duration-200 hover:bg-primary-accent/10 hover:text-primary-accent focus:bg-primary-accent/10 focus:text-primary-accent">
                  <span className="transition-colors duration-200">{title}</span>
                  <CaretDownIcon
                    className="text-gray-400 duration-200 relative top-[-1px] size-4 transition-all ease-in group-data-[state=open]:-rotate-180 group-hover:text-primary-accent"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                  <EnhancedNavListItem navTitle={title} navItemsArray={nav} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          })}
      </NavigationMenu.List>
      <div
        className={cn(
          'perspective-[2000px] absolute top-full flex w-full mt-4',
          activeMenu === 'About' ||
            (activeMenu === '' && lastActiveMenu.current === 'About')
            ? 'justify-start md:-translate-x-[60px]'
            : 'left-1/2 w-auto -translate-x-1/2',
        )}
      >
        <NavigationMenu.Viewport className="data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn relative mt-3 h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-hidden rounded-2xl bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: React.HTMLAttributes<HTMLAnchorElement>['className'];
  href: string;
  title: string;
  children?: React.ReactNode;
}

type Ref = HTMLAnchorElement;

const ListItem = React.forwardRef<Ref, Props>(
  ({ className, children, title, href, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={cn(
            'block select-none rounded-[8px] p-2 text-sm leading-none text-black no-underline outline-none transition-colors hover:bg-primary-accent hover:bg-opacity-50 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-primary-accent',
            className
          )}
          href={href}
          {...props}
          ref={forwardedRef}
        >
          <div className="font-medium leading-[1.2]">{title}</div>
          {children && (
            <p className="text-xs leading-[1.4] text-opacity-60">{children}</p>
          )}
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

export default Nav;