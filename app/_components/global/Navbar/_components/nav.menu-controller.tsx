import type { SettingsPayload } from '@/types';
import React from 'react';
import { cn } from '@/lib/utils';
import Menu from '@/app/_components/global/Navbar/_components/nav.menu';

const MenuLine = {
  default: cn(
    'h-[2px] bg-primary-foreground transition-all duration-300 ease w-8 lg:first-of-type:w-6 lg:group-hover:first-of-type:w-8 lg:group-hover:last-of-type:w-6'
  ),
  open: cn(
    'w-8 lg:first-of-type:w-8 lg:group-hover:last-of-type:w-8 transform first-of-type:rotate-45 first-of-type:translate-y-[200%] last-of-type:-rotate-45 last-of-type:-translate-y-[200%] delay-150'
  ),
};

const NavMenuController = ({
  data,
  setMenu,
  menu,
}: {
  data: SettingsPayload;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menu: boolean;
}) => {
  return (
    <div className="flex lg:hidden">
      {data?.mainNav?.menu && data.mainNav.menu.length > 0 && (
        <>
          <button
            aria-label="menu-button"
            onClick={() => setMenu(!menu)}
            className={cn(
              'interactable ease group z-[100] flex w-8 flex-col items-center justify-center gap-[4px] bg-transparent p-4 transition-all duration-300 lg:items-start lg:justify-start',
              menu
                ? 'open gap-[6px] lg:items-center lg:justify-center'
                : 'closed'
            )}
          >
            <div className={cn(MenuLine.default, menu && MenuLine.open)} />
            <div className={cn(MenuLine.default, menu && MenuLine.open)} />
          </button>
          <Menu data={data} show={menu} setShow={setMenu} />
        </>
      )}
    </div>
  );
};

export default NavMenuController;
