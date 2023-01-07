import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import * as Notify from 'services/Notify';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export default class Searchbar extends Component {
  static defaultProps = {};

  static propTypes = {
    searchQuery: PropTypes.array,
  };

  state = {
    searchQuery: '',
  };

  handleSearchQuery = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return Notify.NotificationWarning(Notify.EMPTY_QUERY_MESSAGE);
    }
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch style={{ width: '1.5em', height: '1.5em' }} />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="searchQuery"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQuery}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}
