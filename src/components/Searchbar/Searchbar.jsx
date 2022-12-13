import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { SlMagnifier } from 'react-icons/sl';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleSearchChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  formSubmit = event => {
    const { searchQuery } = this.state;
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Request field is empty', {
        icon: '☣️',
      });
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.formSubmit}>
          <SearchFormButton type="submit">
            <SlMagnifier size={22} />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
