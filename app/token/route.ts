import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  if (!process.env.ABLY_API_KEY) {
    return NextResponse.json({ errorMessage: `Missing ABLY_API_KEY environment variable.
        If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key.
        If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY.
        Please see README.md for more details on configuring your Ably API Key.`,
      },{
        status: 500,
        headers: new Headers({
          "content-type": "application/json"
        })
      });
  }

  const clientId = ( (await req.formData()).get('clientId')?.toString() ) || process.env.DEFAULT_CLIENT_ID || "NO_CLIENT_ID";

  // Parse the API key to extract keyName and keySecret
  // Ably API key format: appId.keyId:keySecret
  const apiKey = process.env.ABLY_API_KEY;
  const [keyName, keySecret] = apiKey.split(':');

  if (!keyName || !keySecret) {
    return NextResponse.json({
      errorMessage: 'Invalid ABLY_API_KEY format. Expected format: appId.keyId:keySecret'
    }, {
      status: 500,
      headers: new Headers({
        "content-type": "application/json"
      })
    });
  }

  // Create JWT claims
  const currentTime = Math.floor(Date.now() / 1000);
  const claims = {
    'x-ably-capability': JSON.stringify({ '*': ['*'] }), // Full capabilities - adjust as needed
    'x-ably-clientId': clientId,
    'iat': currentTime,
    'exp': currentTime + 3600 // Token expires in 1 hour
  };

  // Sign the JWT with the key secret
  const token = jwt.sign(claims, keySecret, {
    keyid: keyName,
    algorithm: 'HS256'
  });

  console.log('Generated JWT token for client:', clientId);
  return NextResponse.json(token);
}
