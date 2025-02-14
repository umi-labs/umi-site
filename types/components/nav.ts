export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export type Menu =
  | {
      _type: string;
      _key: string;
      title: string;
      subNavigation: 'none';
      detailed: boolean;
      nav: NavItem;
    }
  | {
      _type: string;
      _key: string;
      title: string;
      subNavigation: 'manual' | 'collection';
      detailed: boolean;
      nav: NavItem[];
    };

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
  _key: string;
  displayExternal: boolean;
  description?: string;
  url?: string;
  title: string;
  slug: string;
  hasParent: boolean;
  parentSlug?: string;
  type: string;
}
