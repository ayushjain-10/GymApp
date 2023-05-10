// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/slice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
