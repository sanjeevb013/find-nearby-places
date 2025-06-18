import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentLocation } from '../../utils/getLocation';

type Coords = [number, number];

interface LocationState {
  coords: Coords | null;
  status: 'idle' | 'loading' | 'failed';
  error : string | null;
}

const initialState: LocationState = {
  coords: null,
  status: 'idle',
  error : null,
};

// Async thunk wraps the helper you already have
export const detectLocation = createAsyncThunk<Coords>(
  'location/detectLocation',
  async () => {
    const pos = await getCurrentLocation();
    return [pos.coords.latitude, pos.coords.longitude] as Coords;
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(detectLocation.pending,  state => {
        state.status = 'loading';
        state.error  = null;
      })
      .addCase(detectLocation.fulfilled, (state, action: PayloadAction<Coords>) => {
        state.status = 'idle';
        state.coords = action.payload;
      })
      .addCase(detectLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.error.message ?? 'Failed to detect location';
      });
  },
});

export default locationSlice.reducer;
