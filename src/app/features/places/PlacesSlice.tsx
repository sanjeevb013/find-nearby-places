import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../lib/store';
import { Place, PlaceDetails } from './types';

const BASE_URL = 'https://places-api.foursquare.com';


export const fetchPlaces = createAsyncThunk<
  Place[],
  { lat: number; lng: number; query: string; limit?: number },
  { rejectValue: string }
>(
  'places/fetch',
  async ({ lat, lng, query, limit = 10 }, { rejectWithValue }) => {
    const cacheKey = `places_${query.toLowerCase()}`;
    const cacheTTL = 1000 * 60 * 60; // 1 hour

    try {
      const cachedEntry = localStorage.getItem(cacheKey);
      if (cachedEntry) {
        const { timestamp, data } = JSON.parse(cachedEntry);
        const now = Date.now();

        if (now - timestamp < cacheTTL) {
          return data as Place[];
        } else {
          // Expired cache, remove it
          localStorage.removeItem(cacheKey);
        }
      }

      const { data } = await axios.get<{ results: Place[] }>('/api/foursquare', {
        params: { lat, lng, query, limit },
      });

      // Cache with timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: data.results })
      );

      return data.results;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message ?? e.message);
    }
  }
);

interface PlacesState {
  items: Place[];  
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;

  placeDetail: PlaceDetails | null;
   detailsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailsError: string | null;
  selectedId: string | null;   
}

const initialState: PlacesState = {
  items: [],
  status: 'idle',
  error: null,
    placeDetail: null,
   detailsStatus: 'idle',
  detailsError: null,
    selectedId: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    selectPlace(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
        clearDetails(state) {
      state.placeDetail = null;
     state.detailsStatus = 'idle';
      state.detailsError = null;
    },
  },
  extraReducers: (b) =>
    b
      .addCase(fetchPlaces.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.items = a.payload;
      })
      .addCase(fetchPlaces.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload ?? 'Request failed';
      })
});

export const { selectPlace, clearDetails } = placesSlice.actions;
export default placesSlice.reducer;

// selectors
export const selectAllPlaces = (state: RootState) => state.places.items;
export const selectPlaceDetail = (state: RootState) => state.places.placeDetail;
