import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { SlMagnifier } from 'react-icons/sl';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const formSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Request field is empty', {
        icon: '☣️',
      });
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={formSubmit}>
        <SearchFormButton type="submit">
          <SlMagnifier size={22} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
