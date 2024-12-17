import { Link } from '@/types/generics';

export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export interface Menu {
  _type: string;
  _key: string;
  title: string;
  displayList: boolean;
  itemsList: NavList;
  items: NavItem;
}

export interface NavList {
  _type: string;
  detailedSubMenu: boolean;
  items: NavItem[];
  subMenuName: string;
}

export interface Nav {
  id: string;
  _type: string;
  title: string;
  displayList: boolean;
  menu: Menu[];
  items: NavItem[];
  ctaButton?: {
    text: string;
    url: string;
  };
}

export interface NavItem {
  _type: string;
  _key: string;
  name: string;
  navItemUrl: Link;
}
