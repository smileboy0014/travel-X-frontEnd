import React, { useEffect, useState } from "react";
import RecentSearch from "../../../pages/search/RecentSearch";
import SearchBar from "../../../pages/search/SearchBar";

const Search = ({ getClose }) => {
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);

  useEffect(() => {
    if (searchValue !== undefined) {
      getClose(true);
    }
  }, [searchValue]);

  return (
    <div>
      <div>
        <SearchBar
          getSearchValue={(value) => {
            setSearchValue(value);
          }}
          getSearchAutoComptValue={(value) => {
            setSearchAutoComptValue(value);
          }}
        ></SearchBar>
        <RecentSearch
          sendSearchValue={searchValue}
          sendSearchAutoComptValue={searchAutoComptValue}
          getSearchValue={(value) => {
            setSearchValue(value);
          }}
        ></RecentSearch>
      </div>
    </div>
  );
};

export default Search;
