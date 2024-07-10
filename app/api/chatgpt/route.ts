import OpenAI from 'openai';
// import { Ratelimit } from '@upstash/ratelimit';
// import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Create an Upstash Redis instance
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// // Create a Ratelimit instance to limit requests
// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(10, '10 s'),
// });

// export const runtime = 'edge';

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_OPENAI_SECRET}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are pretty sure about it lets go',
          },
          {
            role: 'user',
            content: `Tell me ${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
