import React, { useCallback, useState, useEffect } from "react";
import Axios from "axios";
import Style from "../../styles/ReviewSearchBar.module.css";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const ReviewSearchBar = (props) => {
  const { getSearchValue, getPlaceholderValue } = props;
  const [searchValue, setSearchValue] = useState();
  const [placeholderValue, setplaceholderValue] = useState();

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onSubmit(e);
    }
  };

  const onChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // getSearchValue(searchValue);
    },
    [searchValue]
  );

  useEffect(() => {
    if (getPlaceholderValue !== undefined) {
      setplaceholderValue(getPlaceholderValue);
      setSearchValue("");
    }
  }, [getPlaceholderValue]);

  return (
    <div>
      <div className={Style.ListFilterSearch}>
        <AiOutlineSearch className={Style.ListFilterSearch_icon2} />
        <input
          type="text"
          className={Style.ListFilterSearch_text}
          value={searchValue}
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
          placeholder={placeholderValue}
        />

        {searchValue && (
          <AiOutlineClose
            onClick={() => {
              setSearchValue("");
            }}
            className={Style.ListFilterSearch_close}
          ></AiOutlineClose>
        )}
      </div>
    </div>
  );
};

export default ReviewSearchBar;
