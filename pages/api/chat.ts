import type { NextApiRequest, NextApiResponse } from 'next';


// Assuming you're in an environment where `Request` and `Response` are global objects.
// This is typical in environments like Cloudflare Workers.

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if it's a POST request
    if (req.method !== 'POST') {
      // Here you're constructing a response for methods that are not POST
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
        headers: { Allow: 'POST' },
      });
    }
    // Constructing the body of the response object
    
    
    // const prompt = req.body.prompt;
    console.log("----------------------------- req.body", req.body)
    // const prompt = "who hates me"
    const prompt = req.body.messages.pop().content;
    console.log("---------PROMPT", prompt)
    const responseBody = await getResponseBody(prompt)

    // Respond with a static message
    res.status(200).json(responseBody);
  } catch (error) {
    console.error(error);
    // Return a 500 Error response if there is an error.
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const FLASK_API_URL = "http://localhost:5000" as const
async function getResponseBody(prompt:string): Promise<{ message: string; texts: TextSources[] }> {
  // const prompt = "who hates me"

  const apiUrl = encodeURI(`${FLASK_API_URL}/get?msg=${prompt}`)
  console.log("---request url", apiUrl)
  
  
  const res0 = await fetch(apiUrl)
  console.log("---FLASK RESPONSE", res0)
  const res = await res0.json()

  return {
    message: res.response,
    texts: res.texts,
  };
}


export default handler;

export type TextSources = {
  text: string;
  user: string;
  timestamp: number;
};