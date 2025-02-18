import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  emailBody?: object;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000/';

export const EmailTemplate = ({ emailBody }: EmailTemplateProps) => {
  const body =
    emailBody &&
    Object.keys(emailBody).map((key) => {
      return (
        <Row key={key} className="w-full p-4">
          <Column className="w-1/3 capitalize">
            <Text className="pl-4">{key}:</Text>
          </Column>
          <Column>
            <Text>{emailBody[key]}</Text>
          </Column>
        </Row>
      );
    });

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>You have mail</title>
      </Head>
      <Body className="mx-auto my-0 max-w-3xl bg-white font-sans">
        <Preview>You have mail</Preview>
        <Container className="mx-auto my-0 px-5 py-0">
          <Section className="mt-8">
            <Img
              src={`${baseUrl}/assets/images/umi-logo.svg`}
              width="120"
              height="36"
              alt="Umi Digital"
            />
          </Section>
          <Heading className="my-8 p-0 text-4xl font-bold text-black">
            You have mail!
          </Heading>

          <Section
            style={bodyContainer}
            className="mb-8 rounded-[4px] bg-[rgb(245,244,245)] px-2.5 py-10"
          >
            {body}
          </Section>

          <Section>
            <Text className="mb-12 text-left text-[12px] leading-4 text-gray-500">
              ©2025 Umi Digital, LTD.
              <br />
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const json = {
  name: 'Umi Digital',
  email: 'hello@umi-digital.com',
};

EmailTemplate.PreviewProps = {
  emailBody: json,
} as EmailTemplateProps;

export default EmailTemplate;

const bodyContainer = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '40px 10px',
};
