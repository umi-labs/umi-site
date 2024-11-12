import React from 'react';
import { MenuContainer } from '@/app/_components/global/Footer/_components/footer.menucontainer';
import { ContactDetails, SocialLinkItem } from '@/types';
import Link from 'next/link';

interface Props {
  contactDetails: ContactDetails;
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
          {contactDetails.addresses &&
            contactDetails.addresses.length > 0 &&
            contactDetails.addresses.map((address, index) => {
              const res = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;

              return (
                <p key={index} className="text-sm font-normal">
                  {res}
                </p>
              );
            })}
        </div>
      </div>

      {/*  Social Media Icons */}
      {socialLinks && socialLinks?.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <p className="sr-only">Social Media</p>
          {socialLinks.map((socialLink, index) => {
            console.log(socialLink);
            return (
              <Link
                key={index}
                href={socialLink.link || '#'}
                className="text-sm font-normal"
              >
                {socialLink.title}
              </Link>
            );
          })}
        </div>
      )}
    </MenuContainer>
  );
}
