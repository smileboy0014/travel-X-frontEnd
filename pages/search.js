import React, { useEffect, useState } from "react";
import RecentSearch from "./search/RecentSearch";
import SearchBar from "./search/SearchBar";
import styles from "../styles/Index.module.css";

const search = () => {
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className={styles.background}>
      <div className={styles.main}>
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
        ></RecentSearch>
      </div>
    </div>
  );
};

export default search;
