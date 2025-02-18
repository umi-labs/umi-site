import React from 'react';
import { render } from '@react-email/components';
import EmailTemplate from '@/app/_components/global/EmailTemplate/Component';

interface Props {
  body: object;
}

export default async function TemplateRenderer({ body }: Props) {
  return await render(<EmailTemplate emailBody={body}></EmailTemplate>);
}
