import { List } from './ContactsList.styled';
import { useSelector } from 'react-redux';
import { ListItem } from './ListItem';
import { selectFilteredContactsIds } from 'redux/features';

export const ContactsList = () => {
  const contactIds = useSelector(selectFilteredContactsIds);
  const renderedListItems = contactIds.map(contactId => {
    return <ListItem id={contactId} key={contactId} />;
  });

  return (
    <div style={{ overflow: 'hidden', marginTop: '2em' }}>
      <List>{renderedListItems}</List>
    </div>
  );
};
