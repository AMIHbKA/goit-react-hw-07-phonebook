import { Filter } from './Filter/Filter';
import { ContactForm } from './PhoneBook/ContactForm/ContactForm';
import { ContactsList } from './PhoneBook/ContactsList/ContactsList';
import { Container } from './UI/Container/Container.styled';
import { TittleStyled } from './UI/Tittle.styled';

export const App = () => {
  return (
    <Container>
      <TittleStyled>Phonebook</TittleStyled>
      <ContactForm />
      <TittleStyled>Contacts</TittleStyled>
      <Filter />
      <ContactsList />
    </Container>
  );
};
