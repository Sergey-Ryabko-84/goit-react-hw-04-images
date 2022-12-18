import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SubmitButton,
  Input,
  Icon,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => setQuery(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Enter your request');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SubmitButton type="submit">
            <Icon />
        </SubmitButton>
        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
