import { Nunito, Poppins, Tenor_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-tenor-sans',
  adjustFontFallback: false,
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
  adjustFontFallback: false,
});

export const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  adjustFontFallback: false,
});

export const satoshi = localFont({
  src: '../../public/assets/fonts/Satoshi.woff2',
  variable: '--font-satoshi',
});

export const satoshiItalic = localFont({
  src: '../../public/assets/fonts/SatoshiItalic.woff2',
  variable: '--font-satoshi-italic',
});

export const switzer = localFont({
  src: '../../public/assets/fonts/Switzer-Variable.woff2',
  variable: '--font-switzer',
});

export const switzerItalic = localFont({
  src: '../../public/assets/fonts/Switzer-VariableItalic.woff2',
  variable: '--font-switzer-italic',
});
