import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from './QuestionList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import QuestionList from './QuestionList.jsx';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  align-items: center;
  margin: 1rem 0 0 1rem;
  border: solid;
  border-color: #36393E;
`;
const SearchInput = styled.input`
  margin: 0 0.5rem 0 0.5rem;
  border: none;
  outline: none;
  background: #FFFAFA;
`;

const Search = () => {

  const { searchQuestions } = useContext(QuestionContext);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    searchQuestions(search);
  };

  return (
    <SearchContainer>
      <div>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
        <SearchInput
          type="text"
          placeholder="Have a question? Search for answers…"
          value={search}
          size="80"
          onChange={handleSearchChange}
        />
      </div>
    </SearchContainer>
  );
}

export default Search;