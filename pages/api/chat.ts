import type { NextApiRequest, NextApiResponse } from 'next';


// Assuming you're in an environment where `Request` and `Response` are global objects.
// This is typical in environments like Cloudflare Workers.

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    console.log('hi');
    // Check if it's a POST request
    if (req.method !== 'POST') {
      // Here you're constructing a response for methods that are not POST
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
        headers: { Allow: 'POST' },
      });
    }
    console.log('hi');
    // Constructing the body of the response object
    const responseBody = { message: 'hello world' };
    console.log('bleh');
    console.log(JSON.stringify(responseBody));
    // Respond with a static message
    res.status(200).json({ message: 'hello world' });
  } catch (error) {
    console.error(error);
    // Return a 500 Error response if there is an error.
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;