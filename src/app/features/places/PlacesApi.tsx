// features/places/placesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Place } from './types';

export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.foursquare.com/v3/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchPlaces: builder.query<
      Place[],
      { lat: number; lng: number; query: string; limit?: number }
    >({
      query: ({ lat, lng, query, limit = 10 }) => ({
        url: 'places/search',
        params: {
          ll: `${lat},${lng}`,
          query,
          limit,
        },
      }),
      transformResponse: (response: { results: Place[] }) => response.results,
    }),
  }),
});

export const { useSearchPlacesQuery } = placesApi;
