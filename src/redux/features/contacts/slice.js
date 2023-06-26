import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
  nanoid,
} from '@reduxjs/toolkit';

const contactsAdapter = createEntityAdapter();

const initialState = contactsAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async () => {
    try {
      const response = await fetch(
        'https://649867909543ce0f49e200a9.mockapi.io/api/contacts'
      );
      return await response.json();
    } catch (error) {}
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync',
  async (newContact, { getState, rejectWithValue }) => {
    const contacts = selectContacts(getState());
    console.log('contacts', contacts);
    const contactExists = Object.values(contacts).find(
      ({ name, number }) =>
        name === newContact.name || number === newContact.number
    );

    if (contactExists) {
      return rejectWithValue(alert('This contact is already added'));
    }

    try {
      const response = await fetch('/api/contacts/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newContact),
      });
      console.log(newContact);
      return await response.json;
    } catch (error) {}
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // addContact: (state, action) => {
    //   const contactToAdd = action.payload;

    //   addContactAsync({ id: 12, name: 'asdf', number: '123-456-789' });
    // },
    deleteContact: contactsAdapter.removeOne,
  },

  //thunk
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        contactsAdapter.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        contactsAdapter.addOne(state.action.payload);
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        if (action.payload) {
          alert(action.payload);
        }
      });
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
