// src/app/api/foursquare/route.ts
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const query = searchParams.get('query');
  const limit = searchParams.get('limit') ?? '10';

  try {
    const response = await axios.get('https://places-api.foursquare.com/places/search', {
      params: {
        ll: `${lat},${lng}`,
        query,
        limit,
      },
      headers: {
        accept: 'application/json',
        'X-Places-Api-Version': '2025-06-17',
        Authorization: `Bearer ${"CUKPYATYQR0GDWIZDMWQHTNEILBDRBY5T2F5NLBUZ2GGHFWY"}`,
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Foursquare error:', err.message);
    return new Response(JSON.stringify({ message: 'Error fetching places' }), {
      status: 500,
    });
  }
}
