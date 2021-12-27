import React, { useEffect, useState } from "react";
import RecentSearch from "./search/RecentSearch";
import SearchBar from "./search/SearchBar";

const search = () => {
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div>
      <SearchBar
        getSearchValue={(value) => {
          setSearchValue(value);
        }}
        getSearchAutoComptValue={(value) => {
          setSearchAutoComptValue(value);
        }}
      ></SearchBar>

      <div>-------------------------------------------</div>
      <RecentSearch
        sendSearchValue={searchValue}
        sendSearchAutoComptValue={searchAutoComptValue}
      ></RecentSearch>
    </div>
  );
};

export default search;
