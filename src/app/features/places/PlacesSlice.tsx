import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../lib/store';
import { Place } from './types';

const BASE_URL = 'https://api.foursquare.com/v3/places/search';
export const fetchPlaces = createAsyncThunk<
  Place[],
  { lat: number; lng: number; query: string; limit?: number },
  { rejectValue: string }
>('places/fetch', async ({ lat, lng, query, limit = 10 }, { rejectWithValue }) => {
  try {
    
    const { data } = await axios.get<{ results: Place[] }>(BASE_URL, {
      params: { ll: `${lat},${lng}`, query, limit },
      headers: { Authorization: "fsq30Q8i/eVynXTu8TMtSPJ9/MHzG+o3+82B6zyDX/n7UK0=" },
    });
    return data.results;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message ?? e.message);
  }
});

interface PlacesState {
  items: Place[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedId: string | null;    // example of extra state
}

const initialState: PlacesState = {
  items: [],
  status: 'idle',
  error: null,
  selectedId: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    selectPlace(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
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
      }),
});

export const { selectPlace } = placesSlice.actions;
export default placesSlice.reducer;

// selectors
export const selectAllPlaces = (state: RootState) => state.places.items;
export const selectPlaceById = (id: string) => (state: RootState) =>
  state.places.items.find((p) => p.fsq_id === id);
