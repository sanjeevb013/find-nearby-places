import { configureStore } from '@reduxjs/toolkit';
import placesReducer from '../features/places/PlacesSlice';
import { placesApi } from '../features/places/PlacesApi';
import currentAddressReducer from '../features/currentAddress/currentAddressSLice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    address:currentAddressReducer,
    weather:weatherReducer,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(placesApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// ✅ RootState and AppDispatch types (this is what your components will use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
