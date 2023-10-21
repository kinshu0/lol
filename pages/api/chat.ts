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
    //make a collection of 10 sample texts
    const sampleTexts: TextSources[] = [
      {
        text: 'Happy Birthday! Hope your day is as amazing as you are!',
        user: 'JohnDoe',
        timestamp: 1671619200, // example timestamp
      },
      {
        text: 'Wishing you all the happiness on your special day! 🎉',
        user: 'JaneDoe',
        timestamp: 1671622800, // example timestamp
      },
      {
        text: "HBD! Can't wait to celebrate with you tonight!",
        user: 'Mike_Smith',
        timestamp: 1671626400, // example timestamp
      },
      {
        text: '🎂 Sending you a big birthday hug! Have a great one!',
        user: 'SarahP',
        timestamp: 1671630000, // example timestamp
      },
      {
        text: "Happy Birthday! Let's make this year the best one yet!",
        user: 'Tom_Jones',
        timestamp: 1671633600, // example timestamp
      },
      {
        text: 'Another year older, wiser, and even more awesome. Happy Birthday!',
        user: 'JenniferM',
        timestamp: 1671637200, // example timestamp
      },
      {
        text: 'Hope your birthday is just the beginning of a year full of happiness!',
        user: 'AlexW',
        timestamp: 1671640800, // example timestamp
      },
      {
        text: 'Have a wonderful birthday, my dear! You deserve all the joy in the world 🎈',
        user: 'ChrisF',
        timestamp: 1671644400, // example timestamp
      },
      {
        text: 'Happy Birthday! 🎁 Enjoy this day to the fullest!',
        user: 'PatriciaH',
        timestamp: 1671648000, // example timestamp
      },
      {
        text: 'Best wishes on your birthday! May you have many, many more!',
        user: 'Bill_S',
        timestamp: 1671651600, // example timestamp
      },
    ];

    const responseBody = {
      message:
        'hello worldhello worldhello worldhello worldhello worldhell',
      texts: sampleTexts,
    };

    // Respond with a static message
    res.status(200).json(responseBody);
  } catch (error) {
    console.error(error);
    // Return a 500 Error response if there is an error.
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

export type TextSources = {
  text: string;
  user: string;
  timestamp: number;
};