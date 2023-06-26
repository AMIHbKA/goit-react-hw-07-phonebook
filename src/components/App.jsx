import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Filter } from './Filter/Filter';
import { ContactForm } from './PhoneBook/ContactForm/ContactForm';
import { ContactsList } from './PhoneBook/ContactsList/ContactsList';
import { Container } from './UI/Container/Container.styled';
import { TittleStyled } from './UI/Tittle.styled';
import 'react-toastify/dist/ReactToastify.css';
import { selectFilteredContactsIds } from 'redux/features';

export const App = () => {
  const error = useSelector(state => state.contacts.error);
  const total = useSelector(selectFilteredContactsIds);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <header></header>
      <main>
        <Container>
          <TittleStyled>Phonebook</TittleStyled>
          <ContactForm />
          <TittleStyled>Contacts: {total.length}</TittleStyled>
          <Filter />
          <ContactsList />
          <ToastContainer />
        </Container>
      </main>
      <footer></footer>
    </>
  );
};
