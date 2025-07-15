import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../lib/store';
import { Place, PlaceDetails } from './types';

const BASE_URL = 'api/foursquare';

export const fetchPlaces = createAsyncThunk<
  Place[],
  { lat: number; lng: number; query: string; limit?: number },
  { rejectValue: string }
>('places/fetch', async ({ lat, lng, query, limit = 10 }, { rejectWithValue }) => {
  const cacheKey = `places_${query.toLowerCase()}`; // You can include lat/lng if needed for precision

  try {
    // 1. Check if data already exists in localStorage
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData) as Place[];
    }

    // 2. Make API call if not cached
    const { data } = await axios.get<{ results: Place[] }>(`${BASE_URL}`, {
      params: { ll: `${lat},${lng}`, query, limit },
      headers: {
        accept: 'application/json',
        'X-Places-Api-Version': '2025-06-17',
        Authorization:"Bearer CUKPYATYQR0GDWIZDMWQHTNEILBDRBY5T2F5NLBUZ2GGHFWY"
      },
    });

    // 3. Store result in localStorage
    localStorage.setItem(cacheKey, JSON.stringify(data.results));

    return data.results;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message ?? e.message);
  }
});


// 2️⃣  DETAILS BY ID 
export const fetchPlaceDetails = createAsyncThunk<PlaceDetails, string, { rejectValue: string }>('places/fetchById', async (fsqId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<PlaceDetails>(`${BASE_URL}places/${fsqId}`, {
      headers: { Authorization:"fsq30Q8i/eVynXTu8TMtSPJ9/MHzG+o3+82B6zyDX/n7UK0=" },
    });
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message ?? e.message);
  }
});


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
      // details by id
      .addCase(fetchPlaceDetails.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(fetchPlaceDetails.fulfilled, (s, a) => {
        s.status = 'succeeded';
          s.placeDetail = a.payload; 
      })
      .addCase(fetchPlaceDetails.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload ?? 'Request failed';
      }),
});

export const { selectPlace, clearDetails } = placesSlice.actions;
export default placesSlice.reducer;

// selectors
export const selectAllPlaces = (state: RootState) => state.places.items;
export const selectPlaceById = (id: string) => (state: RootState) =>
  state.places.items.find((p) => p.fsq_id === id);
export const selectPlaceDetail = (state: RootState) => state.places.placeDetail;
