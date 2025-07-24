import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the expected response structure
interface NominatimResponse {
  display_name: string;
  address: {
    [key: string]: string;
  };
}

export const fetchAddress = createAsyncThunk<
  NominatimResponse,
  { lat: number; lng: number },
  { rejectValue: string }
>("address", async ({ lat, lng }, { rejectWithValue }) => {
  const cacheKey = `address_${lat}_${lng}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    console.log("🟡 Using cached address");
    return JSON.parse(cached);
  }

  try {
    const { data } = await axios.get<NominatimResponse>(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon: lng,
          format: "jsonv2",
        },
        headers: {
          // Required by Nominatim
          "User-Agent": "YourAppName/1.0 (your@email.com)",
        },
      }
    );

    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.error ?? e.message);
  }
});


interface AddressState {
  currentAddress: NominatimResponse | null;
  addressStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  addressError: string | null;
}
const initialState: AddressState = {
  currentAddress: null,
  addressStatus: 'idle',
  addressError: null,
};
const currentAddress = createSlice({
  name: 'address',
  initialState,
  reducers: {
  
        clearDetails(state) {
      state.currentAddress = null;
     state.addressStatus = 'idle';
      state.addressError = null;
    },
  },
  extraReducers: (b) =>
    b
      .addCase(fetchAddress.pending, (s) => {
        s.addressStatus = 'loading';
        s.addressError = null;
      })
      .addCase(fetchAddress.fulfilled, (s, a) => {
        s.addressStatus = 'succeeded';
        s.currentAddress = a.payload;
      })
      .addCase(fetchAddress.rejected, (s, a) => {
        s.addressStatus = 'failed';
        s.addressError = a.payload ?? 'Request failed';
      })
 
});

export const { clearDetails } = currentAddress.actions;
export default currentAddress.reducer;
