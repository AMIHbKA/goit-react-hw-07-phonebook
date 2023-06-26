import { configureStore } from '@reduxjs/toolkit';
import { filterSlice, contactsSlice } from './features/index';

export const store = configureStore({
  reducer: { contacts: contactsSlice.reducer, filter: filterSlice.reducer },
});
