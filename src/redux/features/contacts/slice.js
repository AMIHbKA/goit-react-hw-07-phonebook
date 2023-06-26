import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';

const BASE_URL = 'https://64993a0679fbe9bcf83eceb6.mockapi.io/contacts';

const contactsAdapter = createEntityAdapter();

const initialState = contactsAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async (_, rejectWithValue) => {
    try {
      const response = await fetch(BASE_URL);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync',
  async (newContact, { getState, rejectWithValue }) => {
    const contacts = selectContacts(getState());
    const contactExists = contacts.find(
      ({ name, number }) =>
        name === newContact.name || number === newContact.number
    );

    if (contactExists) {
      return rejectWithValue('This contact is already added');
    }

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newContact),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContactAsync',
  async (id, rejectWithValue) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const asyncActions = [fetchContacts, addContactAsync, deleteContactAsync];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  //thunk
  extraReducers: builder => {
    builder
      .addMatcher(
        action =>
          asyncActions.some(
            asyncAction => action.type === asyncAction.pending.toString()
          ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          asyncActions.some(
            asyncAction => action.type === asyncAction.fulfilled.toString()
          ),
        (state, action) => {
          if (action.type === fetchContacts.fulfilled.toString()) {
            contactsAdapter.setAll(state, action.payload);
          } else if (action.type === addContactAsync.fulfilled.toString()) {
            contactsAdapter.addOne(state, action.payload);
          } else if (action.type === deleteContactAsync.fulfilled.toString()) {
            contactsAdapter.removeOne(state, action.payload);
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          asyncActions.some(
            asyncAction => action.type === asyncAction.rejected.toString()
          ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const { selectAll: selectContacts, selectById: selectContactById } =
  contactsAdapter.getSelectors(state => state.contacts);

export const selectContactIds = createSelector(selectContacts, contacts =>
  contacts.map(contact => contact.id)
);

export const selectFilteredContactsIds = createSelector(
  [selectContacts, state => state.filter],
  (contacts, filter) =>
    contacts
      .filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.toLowerCase().includes(filter.toLowerCase())
      )
      .map(contact => contact.id)
);
