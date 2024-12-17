import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';
import type { HomeHeroProps } from '@/app/_components/shared/heros/HomeHero';
import type { PrimaryHeroProps } from '@/app/_components/shared/heros/PrimaryHero';
import type {
  Color,
  ContactDetails,
  Favicon,
  MetaData,
  SocialLinkItem,
  Sponsor,
} from '@/types/generics';
import type { MenuItem, Nav, NavItem } from '@/types/components/nav';

export interface HeroProps {
  HomeHero?: HomeHeroProps[];
  PrimaryHero?: PrimaryHeroProps[];
}

// Page payloads

export interface HomePagePayload {
  hero?: HeroProps[];
  blocks?: PortableTextBlock[];
  footer?: PortableTextBlock[];
  overview?: PortableTextBlock[];
  metaData: MetaData;
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

export interface PostPayload {
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

export interface ThemeSettingsPayload {
  logo?: Image;
  favicon?: Favicon;
  background?: Color;
  foreground?: Color;
  accent?: Color;
}
