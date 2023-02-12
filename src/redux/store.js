//import { api } from './apiSlice'
import { configureStore } from '@reduxjs/toolkit';
import mediaListReducer from './reducers/mediaListSlice';
import ratingsReducer from './reducers/ratingsSlice';
import scareFactorsReducer from './reducers/scareFactorsSlice';

export const store = configureStore({
  reducer: {
    mediaList: mediaListReducer,
    ratings: ratingsReducer,
    scareFactors: scareFactorsReducer
  }

});
//[api.reducerPath]: api.reducer,
//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
