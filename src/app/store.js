import { configureStore } from '@reduxjs/toolkit';

import photoReducer from 'features/photo/photo-slice';

const rootReducer = {
  photos: photoReducer
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
