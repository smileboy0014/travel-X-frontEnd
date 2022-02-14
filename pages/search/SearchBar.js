import React, { useCallback, useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import PesonalModal from "../../components/Modal/Personal/PersonalModal";
import { useSelector } from "react-redux";
import Style from "../../styles/SearchBar.module.css";
import { AiOutlineSearch, AiOutlineClose, AiOutlineLeft } from "react-icons/ai";

const SearchBar = ({
  getSearchValue,
  getSearchAutoComptValue,
  sendTextValue,
  getRecentListView,
  getSearchTxt,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [placeholderValue, setplaceholderValue] = useState("");
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [checkBackStep, setCheckBackStep] = useState(true);
  const { searchDate } = useSelector((state) => state.date);
  const router = useRouter();

  const onChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);
  const week = new Array("일", "월", "화", "수", "목", "금", "토");

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAutoComplt();
      if (getSearchTxt !== undefined) {
        getSearchTxt(searchValue);
      }
    }, 100);
    return () => clearTimeout(timerId);
  }, [searchValue]);

  const getAutoComplt = () => {
    Axios.get(
      "http://shineware.iptime.org:5051/autocomplete?query=" + searchValue
    )
      .then((res) => {
        console.log("res.data: " + JSON.stringify(res.data["address"]));

        getSearchAutoComptValue(res.data["address"]);
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
      console.log("보내는 문자 : " + searchValue);
    },
    [searchValue, router]
  );

  useEffect(() => {
    if (sendTextValue !== undefined) {
      setplaceholderValue(sendTextValue);
      setSearchValue("");
    }
  }, [sendTextValue]);

  const onClickInput = () => {
    if (getRecentListView != undefined) {
      getRecentListView(true);
      setCheckBackStep(false);
    }
  };

  const onClickBackStep = () => {
    if (checkBackStep) {
      router.back();
    } else if (getRecentListView != undefined) {
      getRecentListView(false);
      setCheckBackStep(true);
      setSearchValue("");
      getSearchValue("");
    }
  };

  // useEffect(() => {
  //   getSearchValue("");
  // }, []);

  return (
    <div>
      <div className={Style.ListFilterSearch}>
        <AiOutlineLeft
          className={Style.ListFilterSearch_icon1}
          onClick={onClickBackStep}
        />
        <AiOutlineSearch className={Style.ListFilterSearch_icon2} />
        <input
          type="text"
          className={Style.ListFilterSearch_text}
          value={searchValue}
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
          placeholder={placeholderValue}
          onClick={onClickInput}
        />

        <PesonalModal
          isOpen={personalModalOpen}
          onRequestClose={() => setPersonalModalOpen(false)}
        />

        {!searchValue && searchDate !== undefined && (
          <span className={Style.ListFilterSearch_date}>
            {`${new Date(searchDate.start).getMonth() + 1}.${new Date(
              searchDate.start
            ).getDate()}(${week[new Date(searchDate.start).getDay()]}) - ${
              new Date(searchDate.end).getMonth() + 1
            }.${new Date(searchDate.end).getDate()}(${
              week[new Date(searchDate.end).getDay()]
            })`}
          </span>
        )}

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

export default SearchBar;
