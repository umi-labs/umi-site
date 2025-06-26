'use client';

import type { Menu as MenuType } from '@/types/components/nav';
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import useResolvedHref from '@/app/_utils/hooks/useResolvedHref';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { cn } from '@/app/_utils';
import Link from 'next/link';
import useStringLimiter from '@/app/_utils/hooks/useStringLimiter';

const NavListItem = ({ navTitle, navItemsArray }) => {
  const isAbout = navTitle === "About";

  return isAbout ? (
    <div className="sm:w-auto sm:min-w-[200px]">
      <ul className={cn('m-0 grid list-none gap-4 px-4 py-3 ')}>
        {navItemsArray.map((item, i) =>
          item.navLinks.map((element, index) => {
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
            {item.navLinks.map((element, index) => {
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
                className="group flex select-none items-center justify-between px-3 py-2 text-xs font-medium leading-none text-black underline-offset-4 outline-none hover:underline focus:underline focus:shadow-[0_0_0_2px]"
              >
                <NavigationMenu.Link
                  href={
                    nav.hasParent && nav.parentSlug
                      ? `/${nav.parentSlug}/${nav.slug}`
                      : nav.type !== 'page'
                        ? `/${nav.type}/${nav.slug}`
                        : `/${nav.slug}`
                  }
                >
                  {title}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={i} value={title}>
                <NavigationMenu.Trigger className="font-sm group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-xs font-medium leading-none text-black outline-none hover:underline focus:underline focus:shadow-[0_0_0_2px]">
                  {title}&nbsp;
                  <CaretDownIcon
                    className="text-violet10 duration-[250ms] relative top-[-1px] size-6 transition-transform ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                  <NavListItem navTitle={title} navItemsArray={nav} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          })}
        {/*<NavigationMenu.Indicator className="data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn top-full z-[1000] flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">*/}
        {/*  <div className="z-90 relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-black" />*/}
        {/*</NavigationMenu.Indicator>*/}
      </NavigationMenu.List>
      <div
        className={cn(
          'perspective-[2000px] absolute top-3/4 flex w-full',
          activeMenu === 'About' ||
            (activeMenu === '' && lastActiveMenu.current === 'About')
            ? 'justify-start md:-translate-x-[60px]'
            : 'left-1/2 w-auto -translate-x-1/2',
        )}
      >
        <NavigationMenu.Viewport className="data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-hidden rounded-xl bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.10)] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
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
