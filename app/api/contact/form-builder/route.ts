export async function POST(req: Request) {
  const data = await req.json();

  try {
    return new Response(JSON.stringify({ data }), { status: 200 });
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
