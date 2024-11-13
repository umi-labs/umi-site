import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';
import { HomeHeroProps } from '@/app/_components/shared/Heros/HomeHero';
import { PrimaryHeroProps } from '@/app/_components/shared/Heros/PrimaryHero';

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

export interface Link {
  _type: string;
  _key: string;
  title: string;
  displayExternal: boolean;
  externalUrl: string;
  internalLink: InternalLink;
}

export interface SocialLinkItem {
  _key: string;
  _type: string;
  link?: string;
  socialMedia: string;
  fillType?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  title?: string;
}

export interface InternalLink {
  _type: string;
  _key: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  postType?: {
    title: string;
    slug: {
      current: string;
    };
  };
}

export interface Policy {
  _type: string;
  _key: string;
  title: string;
  link: NavItem;
}

export interface MetaData {
  title?: string;
  description?: string;
  ogImage?: Image;
  keywords?: string[];
}

export interface HeroProps {
  HomeHero?: HomeHeroProps[];
  PrimaryHero?: PrimaryHeroProps[];
}

export type Sponsor = {
  title: string;
  link: string;
  image: Image;
};

export type ContactDetails = {
  email: string;
  phone: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }[];
};

// Page payloads

export interface HomePagePayload {
  hero?: HeroProps[];
  blocks?: PortableTextBlock[];
  footer?: PortableTextBlock[];
  overview?: PortableTextBlock[];
  metaData?: MetaData;
  title?: string;
}

export interface PagePayload {
  hero?: PortableTextBlock[];
  blocks?: PortableTextBlock[];
  body?: PortableTextBlock[];
  name?: string;
  overview?: PortableTextBlock[];
  metaData?: MetaData;
  title?: string;
  slug?: string;
}

export interface SettingsPayload {
  policies?: NavItem[];
  footerNav?: Nav;
  sponsors?: Sponsor[] | undefined;
  contactDetails?: ContactDetails;
  footerText?: string;
  name?: string;
  initials?: string;
  socialLinks?: SocialLinkItem[];
  customCursor?: boolean;
  footer?: PortableTextBlock[];
  menuItems?: MenuItem[];
  mainNav?: Nav;
  ogImage?: Image;
}

export interface SEOSettingsPayload {
  metaData?: MetaData;
}

type Color = {
  _type: string;
  hex: string;
  alpha: number;
  hsl: {
    _type: 'hslaColor';
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsv: {
    _type: 'hsvaColor';
    h: number;
    s: number;
    v: number;
    a: number;
  };
  rgb: {
    _type: 'rgbaColor';
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

type Favicon = {
  favicon32?: {
    asset?: {
      url: string;
    };
  };
  appleTouchIcon?: {
    asset?: {
      url: string;
    };
  };
  androidChrome192?: {
    asset?: {
      url: string;
    };
  };
};

export interface ThemeSettingsPayload {
  logo?: Image;
  favicon?: Favicon;
  background?: Color;
  foreground?: Color;
  accent?: Color;
}
