import React from 'react';
import { MenuContainer } from '@/app/_components/global/Footer/_components/footer.menucontainer';
import { ContactDetails, SocialLinkItem } from '@/types';
import Link from '@/app/_components/ui/link';
import {
  ApplePodcastsLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
  TwitterLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';

interface Props {
  contactDetails?: ContactDetails;
  socialLinks?: SocialLinkItem[];
}

export default function Contact({ contactDetails, socialLinks }: Props) {
  return (
    <MenuContainer title="Contact Us" className="flex flex-col gap-y-4">
      {/*  Contact Details */}
      <div className="flex flex-col gap-y-4">
        {contactDetails?.email && (
          <div className="flex flex-col gap-y-2">
            <p className="sr-only">Email</p>
            <Link
              href={`mailto:${contactDetails.email}`}
              className="text-sm font-normal"
            >
              {contactDetails?.email}
            </Link>
          </div>
        )}
        {contactDetails?.phone && (
          <div className="flex flex-col gap-y-2">
            <p className="sr-only">Phone</p>
            <Link
              href={`tel:${contactDetails.phone}`}
              className="text-sm font-normal"
            >
              {contactDetails?.phone}
            </Link>
          </div>
        )}
        <div className="hidden flex-col gap-y-2 md:flex">
          <p className="sr-only">Addresses</p>
          {contactDetails?.addresses &&
            contactDetails.addresses.length > 0 &&
            contactDetails.addresses.map((address, index) => {
              const res = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;

              return (
                <p key={index} className="text-wrap text-sm font-normal">
                  {res}
                </p>
              );
            })}
        </div>
      </div>

      {/*  Social Media Icons */}
      {socialLinks && socialLinks?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          <p className="sr-only">Social Media</p>
          {socialLinks.map((socialLink, index) => {
            return (
              <Link
                key={index}
                href={socialLink.link || '#'}
                className="group flex size-8 items-center justify-center rounded-full border bg-white text-sm font-normal transition-all duration-300 ease-in-out hover:bg-zinc-900"
              >
                <span className="sr-only">{socialLink.title}</span>
                <SocialMediaIcon
                  socialMedia={socialLink.socialMedia}
                  weight={socialLink?.fillType}
                  className="size-5 group-hover:fill-zinc-100"
                />
              </Link>
            );
          })}
        </div>
      )}
    </MenuContainer>
  );
}

type SocialMediaIconProps = {
  socialMedia: SocialLinkItem['socialMedia'];
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
} & React.ComponentPropsWithoutRef<'svg'>;

const SocialMediaIcon = ({
  socialMedia,
  weight = 'fill',
  ...props
}: SocialMediaIconProps) => {
  switch (socialMedia) {
    case 'facebook':
      return <FacebookLogo weight={weight} {...props} />;
    case 'youtube':
      return <YoutubeLogo weight={weight} {...props} />;
    case 'twitter':
      return <TwitterLogo weight={weight} {...props} />;
    case 'apple_podcasts':
      return <ApplePodcastsLogo weight={weight} {...props} />;
    case 'instagram':
      return <InstagramLogo weight={weight} {...props} />;
    case 'linkedin':
      return <LinkedinLogo weight={weight} {...props} />;
    case 'spotify':
      return <SpotifyLogo weight={weight} {...props} />;
  }
};
