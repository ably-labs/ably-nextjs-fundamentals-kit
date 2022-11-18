import type { NextApiRequest, NextApiResponse } from 'next'

import * as dotenv from "dotenv";
import * as Ably from "ably/promises";

dotenv.config();

const disallowedWords = [
  'foo',
  'bar',
  'fizz',
  'buzz'
]

type Message = {
  text: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log('/api/pub-sub/publish called')

  if (!process.env.ABLY_API_KEY) {
    return res
            .status(500)
            .setHeader("content-type", "application/json")
            .json({
              errorMessage: `Missing ABLY_API_KEY environment variable.
                If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key.
                If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY. 
                Please see README.md for more details on configuring your Ably API Key.`,
            })
    }

  const clientId = req.body["clientId"] || process.env.DEFAULT_CLIENT_ID || "NO_CLIENT_ID";
  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId });

  var channel = client.channels.get('status-updates');
  const message: Message = req.body

  // By publishing via the serverless function you can perform
  // checks in a trusted environment on the data being published
  const containsDisallowedWord = disallowedWords.some(word => {
    return message.text.match(new RegExp(`\\b${word}\\b`))
  })

  if(containsDisallowedWord) {
    return res.status(403).json({errorMessage: 'text content not accepted'})
  }

  try {
    await channel.publish('update-from-server', message)

    return res.status(200).json(tokenRequestData)
  }
  catch (e) {
    console.error(e)
    return res.status(500).json({errorMessage: 'Error publishing from server'})
  }
}
