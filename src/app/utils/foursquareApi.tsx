import axios from 'axios';

const BASE_URL = 'https://api.foursquare.com/v3/places/search';

export interface Place {
  fsq_id: string;
  name: string;
  location: {
    address?: string;
    locality?: string;
    region?: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  categories: { id: number; name: string }[];
  rating?: number;
  distance: number;
}


export async function fetchPlaces(
  lat: number,
  lng: number,
  query: string,
  limit = 10
): Promise<Place[]> {
  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
  const params = {
    ll: `${lat},${lng}`,
    query,
    limit,
  };
  const headers = { Authorization: `fsq30Q8i/eVynXTu8TMtSPJ9/MHzG+o3+82B6zyDX/n7UK0=` };
  try {
    const res = await axios.get(BASE_URL, {
      headers,
      params,
    });
    return res.data.results;
  } catch (error: any) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return [];
  }
}
