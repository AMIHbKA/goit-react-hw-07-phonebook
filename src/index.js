import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import { GlobalStyle } from './components/UI/GlobalStyles/GlobalStyles';
import { store } from 'redux/store';
import { fetchContacts } from './redux/features/contacts/slice';

store.dispatch(fetchContacts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
