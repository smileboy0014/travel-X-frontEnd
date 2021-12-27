import React, { useCallback, useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import PesonalModal from "../../components/Modal/Personal/PersonalModal";
import { useSelector } from "react-redux";

const SearchBar = ({ getSearchValue, getSearchAutoComptValue }) => {
  const [searchValue, setSearchValue] = useState();
  const router = useRouter();
  const [showPersonalModal, setPersonalShowModal] = useState(false);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  const onChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
    // getSearchValue(e.target.value);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAutoComplt();
    }, 100);
    return () => clearTimeout(timerId);
  }, [searchValue]);

  const getAutoComplt = () => {
    Axios.get(
      "http://shineware.iptime.org:5051/autocomplete?query=" + searchValue
    )
      .then((res) => {
        getSearchAutoComptValue(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/view/${searchValue}`);
      getSearchValue(searchValue);
      setSearchValue("");
    },
    [searchValue, router]
  );

  return (
    <div>
      <input
        type="search"
        // value={searchValue}
        onChange={onChangeSearch}
        placeholder="조회조건"
      />
      <button onClick={onSubmit}>
        <div>{"확인"}</div>
      </button>

      <div>
        <button>12/30 ~ 12/31 1박2일</button>
        <button onClick={() => setPersonalShowModal(true)}>
          {"성인: " + adultCounterValue + " 아동: " + childCounterValue}
        </button>
      </div>

      <PesonalModal
        onClose={() => setPersonalShowModal(false)}
        show={showPersonalModal}
      />
    </div>
  );
};

export default SearchBar;
