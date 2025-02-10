// Singletons
import {
  blocks,
  heros,
  home,
  seoSettings,
  siteSettings,
  themeSettings,
} from '@/sanity/schemas/singletons';

// Documents
import page from '@/sanity/schemas/documents/page';
import project from '@/sanity/schemas/documents/project';
import post from '@/sanity/schemas/documents/post';
import team from '@/sanity/schemas/documents/team';
import contactForm from '@/sanity/schemas/documents/contact-form';
import form from '@/sanity/schemas/documents/form';
import inbox from '@/sanity/schemas/documents/inbox';
import navigation from '@/sanity/schemas/documents/navigation';
import socialMedia from '@/sanity/schemas/singletons/settings/settings.social-media';
import service from '@/sanity/schemas/documents/service';
import review from '@/sanity/schemas/documents/review';
import job from '@/sanity/schemas/documents/job';
import faq from '@/sanity/schemas/documents/faq';
import ctas from '@/sanity/schemas/documents/ctas';

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
import portfolioFullWidth from '@/sanity/schemas/objects/portfolio-full-width';
import archiveBlock from '@/sanity/schemas/objects/archive-block';
import buffers from '@/sanity/schemas/objects/globals/buffers';
import faqBlock from '@/sanity/schemas/objects/faq-block';
import carousel from '@/sanity/schemas/objects/carousel';
import featureGrid from '@/sanity/schemas/objects/feature-grid';
import jobVacancies from '@/sanity/schemas/objects/job-vacancies';
import contentBlock from '@/sanity/schemas/objects/content-block';
import meetTheTeam from '@/sanity/schemas/objects/meet-the-team';
import video from '@/sanity/schemas/objects/globals/video';
import jsonLd from '@/sanity/schemas/objects/globals/json-ld';
import layout from '@/sanity/schemas/objects/globals/layout';
import textBlock from '@/sanity/schemas/objects/text-block';
import ctaBlock from '@/sanity/schemas/objects/cta-block';

export const schema = [
  // Singletons
  home,
  siteSettings,
  themeSettings,
  seoSettings,
  blocks,
  heros,

  // Documents
  page,
  post,
  project,
  team,
  postType,
  contactForm,
  form,
  inbox,
  navigation,
  socialMedia,
  service,
  review,
  job,
  faq,
  ctas,

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
  meetTheTeam,
  button,
  favicon,
  icon,
  ctaBlock,
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
  archiveBlock,
  portfolioFullWidth,
  buffers,
  faqBlock,
  carousel,
  featureGrid,
  jobVacancies,
  contentBlock,
  video,
  jsonLd,
  layout,
  textBlock,
];

export const singletons = [
  home,
  siteSettings.name,
  themeSettings.name,
  seoSettings.name,
];
