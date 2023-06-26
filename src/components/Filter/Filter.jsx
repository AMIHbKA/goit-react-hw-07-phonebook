import { Loader } from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/features';
import { Input } from './Filter.styled';

export const Filter = () => {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const handleFilterChange = event =>
    dispatch(updateFilter(event.target.value));
  const loadingStatus = useSelector(state => state.contacts.isLoading);

  return (
    <>
      {loadingStatus && <Loader />}
      {!loadingStatus && (
        <Input
          placeholder="Search for contacts by name"
          name="filter"
          type="search"
          value={filterValue}
          onChange={handleFilterChange}
          autocomplete="off"
        />
      )}
    </>
  );
};
