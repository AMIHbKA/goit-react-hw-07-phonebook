import React from 'react';
import PropTypes from 'prop-types';
import { Button, Trash } from './ContactsList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContactAsync, selectContactById } from 'redux/features';

export const ListItem = ({ id }) => {
  const contact = useSelector(state => selectContactById(state, id));
  const { name, number } = contact;
  const dispatch = useDispatch();
  const loadingStatus = useSelector(state => state.contacts.isLoading);

  const onDelete = () => {
    dispatch(deleteContactAsync(contact.id));
  };

  return (
    <li>
      <Button
        type="button"
        onClick={onDelete}
        aria-label="Delete Contact"
        disabled={loadingStatus}
      >
        <Trash width={18} height={18} />
      </Button>
      {name}: <a href={`tel:${number}`}>{number}</a>
    </li>
  );
};

ListItem.propTypes = { id: PropTypes.string.isRequired };
