import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherResponse {
  // Define only the fields you need, e.g.:
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export const fetchWeather = createAsyncThunk<
  WeatherResponse,
  { lat: number; lng: number },
  { rejectValue: string }
>("weather/fetchWeather", async ({ lat, lng }, { rejectWithValue }) => {
  const cacheKey = `weather_${lat}_${lng}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    console.log("✅ Using cached weather data");
    return JSON.parse(cached);
  }

  try {
    const { data } = await axios.get<WeatherResponse>(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon: lng,
          units: "metric",
          appid: "d4f662a926e819e0d78c9eed910a5d29",
        },
      }
    );

    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message ?? e.message);
  }
});

interface AddressState {
  weatherSuccess: WeatherResponse | null;
  weatherStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  weatherError: string | null;
}
const initialState: AddressState = {
   weatherSuccess: null,
  weatherStatus: 'idle',
  weatherError: null,
};
const weatherData = createSlice({
  name: 'weather',
  initialState,
  reducers: {
  
        clearWeatherDetails(state) {
      state.weatherSuccess = null;
     state.weatherStatus = 'idle';
      state.weatherError = null;
    },
  },
  extraReducers: (b) =>
    b
      .addCase(fetchWeather.pending, (s) => {
        s.weatherStatus = 'loading';
        s.weatherError = null;
      })
      .addCase(fetchWeather.fulfilled, (s, a) => {
        s.weatherStatus = 'succeeded';
        s.weatherSuccess = a.payload;
      })
      .addCase(fetchWeather.rejected, (s, a) => {
        s.weatherStatus = 'failed';
        s.weatherError = a.payload ?? 'Request failed';
      })
 
});

export const { clearWeatherDetails } = weatherData.actions;
export default weatherData.reducer;
