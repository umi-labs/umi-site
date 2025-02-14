import type { NavItem } from '@/types/components/nav';

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

export interface Layout {
  justify?:
    | 'normal'
    | 'center'
    | 'start'
    | 'end'
    | 'stretch'
    | 'between'
    | 'around'
    | 'evenly';
  align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
  colour?: 'light' | 'dark';
}

export interface Buffers {
  top?: boolean | undefined;
  bottom?: boolean | undefined;
}

export interface Image {
  asset: {
    _type: string;
    description?: string;
    title?: string;
    opt: {
      media: {
        tags: string[];
      };
    };
    _id: string;
    metadata: {
      lqip: string;
      dimensions: {
        aspectRatio: number;
        height: number;
        _type: string;
        width: number;
      };
      isOpaque: false;
      blurHash: string;
      _type: string;
      palette: {
        dominant: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
        _type: string;
        darkMuted: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
        muted: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
        lightVibrant: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
        darkVibrant: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
        lightMuted: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
        vibrant: {
          title: string;
          population: number;
          background: string;
          _type: string;
          foreground: string;
        };
      };
      hasAlpha: true;
    };
    mimeType: string;
    path: string;
    size: number;
    _createdAt: string;
    _rev: string;
    uploadId: string;
    sha1hash: string;
    assetId: string;
    _updatedAt: string;
    originalFilename: string;
    extension: string;
    url: string;
    creditLine?: string;
    altText?: string;
  };
}

export interface Link {
  _type: string;
  _key: string;
  title: string;
  displayExternal: boolean;
  externalUrl: string;
  internalLink: InternalLink;
}

export interface Button {
  title: string;
  link?: NavItem;
  type: 'link' | 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost';
}

export interface Icon {
  type:
    | 'eye'
    | 'rocket'
    | 'clock'
    | 'headphones'
    | 'check'
    | 'check-circle'
    | 'facebook'
    | 'twitter'
    | 'instagram'
    | 'linkedin';
  weight: 'thin' | 'light' | 'regular' | 'bold' | 'duotone' | 'fill';
}

export interface MetaData {
  title: string;
  description: string;
  ogImage?: Image;
  keywords?: string[];
}

export type Color = {
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

export type Favicon = {
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

export interface Policy {
  _type: string;
  _key: string;
  title: string;
  link: NavItem;
}

export interface SocialLinkItem {
  _key: string;
  _type: string;
  link?: string;
  socialMedia: string;
  fillType?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  title?: string;
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
