import { configureStore } from '@reduxjs/toolkit';
import placesReducer from '../features/places/PlacesSlice';
import currentAddressReducer from '../features/currentAddress/currentAddressSLice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    address:currentAddressReducer,
    weather:weatherReducer,
  }
});

// ✅ RootState and AppDispatch types (this is what your components will use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
