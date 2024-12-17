// Singletons
import {
  blocks,
  home,
  seoSettings,
  siteSettings,
  themeSettings,
} from '@/sanity/schemas/singletons';

// Documents
import page from '@/sanity/schemas/documents/page';
import post from '@/sanity/schemas/documents/post';
import teamMember from '@/sanity/schemas/documents/team-member';
import contactForm from '@/sanity/schemas/documents/contact-form';
import form from '@/sanity/schemas/documents/form';
import inbox from '@/sanity/schemas/documents/inbox';
import navigation from '@/sanity/schemas/documents/navigation';
import socialMedia from '@/sanity/schemas/singletons/settings/settings.social-media';

// Objects
import CTATitleImage from '@/sanity/schemas/objects/CTATitleImage';
import blogGrid from '@/sanity/schemas/objects/blogGrid';
import logoCloud from '@/sanity/schemas/objects/logoCloud';
import cardGridSideTitleSimple from '@/sanity/schemas/objects/cardGridSideTitleSimple';
import cardGridSideTitle from '@/sanity/schemas/objects/cardGridSideTitle';
import CTASimple from '@/sanity/schemas/objects/CTASimple';
import CTAWithForm from '@/sanity/schemas/objects/CTAWithForm';
import heroImageOverlap from '@/sanity/schemas/objects/heroImageOverlap';
import heroWithMedia from '@/sanity/schemas/objects/heroWithMedia';
import slider from '@/sanity/schemas/objects/globals/slider';
import testimonialsCarousel from '@/sanity/schemas/objects/testimonialsCarousel';
import alternatingContent from '@/sanity/schemas/objects/alternatingContent';
import hero1 from '@/sanity/schemas/objects/hero1';
import formBuilder from '@/sanity/schemas/objects/form-builder';
import formFields from '@/sanity/schemas/objects/form-fields';
import primaryHero from '@/sanity/schemas/objects/primary-hero';
import basicHero from '@/sanity/schemas/objects/basic-hero';
import imageWithText from '@/sanity/schemas/objects/image-with-text';
import contactFormBlock from '@/sanity/schemas/objects/contact-form-block';
import metaData from '@/sanity/schemas/objects/meta-data';
import navItem from '@/sanity/schemas/objects/navigation/nav-item';
import navList from '@/sanity/schemas/objects/navigation/nav-list';
import link from '@/sanity/schemas/objects/globals/link';
import favicon from '@/sanity/schemas/objects/favicon';
import postType from '@/sanity/schemas/documents/post-type';
import menuItem from '@/sanity/schemas/objects/navigation/menu.item';
import policies from '@/sanity/schemas/singletons/settings/settings.policies';
import button from '@/sanity/schemas/objects/globals/button';
import icon from '@/sanity/schemas/objects/globals/icon';

export const schema = [
  // Singletons
  home,
  siteSettings,
  themeSettings,
  seoSettings,
  blocks,

  // Documents
  page,
  post,
  teamMember,
  postType,
  contactForm,
  form,
  inbox,
  navigation,
  socialMedia,

  // Objects
  primaryHero,
  basicHero,
  imageWithText,
  contactFormBlock,
  formBuilder,
  formFields,
  metaData,
  navItem,
  navList,
  menuItem,
  link,
  button,
  favicon,
  icon,
  hero1,
  policies,
  alternatingContent,
  testimonialsCarousel,
  slider,
  heroWithMedia,
  heroImageOverlap,
  CTASimple,
  CTAWithForm,
  cardGridSideTitle,
  cardGridSideTitleSimple,
  logoCloud,
  blogGrid,
  CTATitleImage,
];

export const singletons = [
  home,
  siteSettings.name,
  themeSettings.name,
  seoSettings.name,
];
