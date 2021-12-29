import React, { useCallback, useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import PesonalModal from "../../components/Modal/Personal/PersonalModal";
import { useSelector } from "react-redux";
import Style from "../../styles/SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPerson, BsCalendar } from "react-icons/bs";

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

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onSubmit(e);
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/view/search/${searchValue}`);
      getSearchValue(searchValue);
      setSearchValue("");
    },
    [searchValue, router]
  );

  return (
    <div>
      <div className={Style.header}>
        <div className={Style.header__center}>
          <input
            type="search"
            onChange={onChangeSearch}
            onKeyPress={onKeyPress}
            placeholder="지역, 지하철역, 숙소명으로 찾아보세요."
          />
          <AiOutlineSearch />
        </div>
      </div>

      <div className={Style.bottom}>
        <div
          className={Style.bottom__center}
          onClick={() => setPersonalShowModal(true)}
        >
          <div className={Style.bottom_div}>
            <div>
              <BsCalendar />
              12/29 ~ 12/31 10박3일
            </div>
          </div>
        </div>
        <div
          className={Style.bottom__center}
          onClick={() => setPersonalShowModal(true)}
        >
          <div className={Style.bottom_div}>
            <div>
              <BsPerson />
              {"성인: " + adultCounterValue + " 아동: " + childCounterValue}
            </div>
          </div>
        </div>
      </div>

      <PesonalModal
        onClose={() => setPersonalShowModal(false)}
        show={showPersonalModal}
      />
    </div>
  );
};

export default SearchBar;
