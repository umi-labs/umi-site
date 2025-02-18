import TemplateRenderer from '@/app/api/contact/send/TemplateRenderer';

export async function POST(req: Request) {
  const { data, email, subject } = await req.json();

  const emailHtml = await TemplateRenderer({ body: data });

  const body = {
    to: email,
    from: 'no-reply@umidigital.co.uk',
    subject: subject,
    body: JSON.stringify(emailHtml),
  };

  const sending = await fetch(process.env.AWS_EMAIL_GATEWAY || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  try {
    return new Response(JSON.stringify({ data }), { status: sending.status });
  } catch (error) {
    console.error('Sanity submission error: ', error);
    return new Response(
      JSON.stringify({ message: `Failed to submit: ${error}` }),
      {
        status: 500,
      }
    );
  }
}
