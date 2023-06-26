import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/features';
import { Input } from './Filter.styled';

export const Filter = () => {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const handleFilterChange = event =>
    dispatch(updateFilter(event.target.value));

  return (
    <>
      <Input
        placeholder="Search for contacts by name"
        name="filter"
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
      ></Input>
    </>
  );
};
