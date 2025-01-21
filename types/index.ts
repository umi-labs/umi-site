import type { PortableTextBlock } from 'next-sanity';
import type {
  Color,
  ContactDetails,
  Favicon,
  Image,
  MetaData,
  SocialLinkItem,
  Sponsor,
} from '@/types/generics';
import type { HomeHeroProps } from '@/app/_components/shared/heros/HomeHero';
import type { PrimaryHeroProps } from '@/app/_components/shared/heros/PrimaryHero';
import type { MenuItem, Nav, NavItem } from '@/types/components/nav';
import { CTASimpleProps } from '@/types/components/ctaSimple';
import { CTATitleImageProps } from '@/types/components/ctaTitleImage';

export interface HeroProps {
  HomeHero?: HomeHeroProps[];
  PrimaryHero?: PrimaryHeroProps[];
}

// Project payloads

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

export interface TeamPayload {
  _id?: string;
  _createdAt?: string;
  name?: string;
  slug?: string;
  image?: Image;
  description?: string;
  role?: string;
  socialLinks?: SocialLinkItem[];
  metaData?: MetaData;
}

export interface ProjectPayload {
  title?: string;
  slug?: string;
  featured?: boolean;
  tags?: string[];
  excerpt?: string;
  clientName?: string;
  clientUrl?: string;
  clientLogo?: Image;
  caseStudyUrl: string;
  coverImage?: Image;
  relatedProjects?: ProjectPayload[];
  body?: PortableTextBlock[];
  cta?: CTASimpleProps;
  contactForm?: CTATitleImageProps;
  name?: string;
  overview?: PortableTextBlock[];
  metaData?: MetaData;
  _id?: string;
  _createdAt?: string;
}

export interface PostPayload {
  _updatedAt?: string;
  _createdAt?: string;
  _id?: string;
  hero?: PortableTextBlock[];
  blocks?: PortableTextBlock[];
  body?: PortableTextBlock[];
  coverImage?: Image;
  excerpt?: string;
  featured?: boolean;
  tags?: string[];
  type?: 'blog' | 'podcast';
  author?: {
    name: string;
    slug: string;
  };
  time?:
    | {
        timeTaken?: number | undefined;
        timeType?: ('blog' | 'podcast') | undefined;
      }
    | undefined;
  name?: string;
  overview?: PortableTextBlock[];
  metaData?: MetaData;
  title?: string;
  slug?: string;
}

export interface ReviewPayload {
  image?: Image;
  name?: string;
  position?: string;
  company?: string;
  review: PortableTextBlock[];
}

export interface JobPayload {
  name?: string;
  slug?: string;
  featured?: boolean;
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract';
  salary?: string;
  excerpt?: string;
  description?: PortableTextBlock[];
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
  secondaryAccent?: Color;
}
