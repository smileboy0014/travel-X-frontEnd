import React, { useCallback, useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import PesonalModal from "../../components/Modal/Personal/PersonalModal";
import { useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
import {AUTO_COMPLETE_API_URL} from '../../shared/js/CommonConstant';

const SearchBar = ({
  getSearchValue,
  getSearchAutoComptValue,
  getSearchAutoComptPropertyNameValue,
  sendTextValue,
  getRecentListView,
  getSearchTxt,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [placeholderValue, setplaceholderValue] = useState("");
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [checkBackStep, setCheckBackStep] = useState(true);
  const { searchDate } = useSelector((state) => state.date);
  const router = useRouter();
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );
  const babyCounterValue = useSelector(
    ({ babyCounter }) => babyCounter.value
  );

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
      AUTO_COMPLETE_API_URL+"/autocomplete?query=" + searchValue
    )
      .then((res) => {
        console.log("res.data: " + JSON.stringify(res.data["address"]));

        getSearchAutoComptValue(res.data["address"]);
        getSearchAutoComptPropertyNameValue(res.data["propertyName"]);
      
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const onKeyPress = (e) => {
   
    if (e.key == "Enter") {
      setShowCloseBtn(false);
      onSubmit(e);
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // 필터 초기화 하기
      // dispatch(roomFilterActions.initValue());
      // debugger;
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
      setShowCloseBtn(true);
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

  const onClickClose = () =>{
      setShowCloseBtn(false);
      setSearchValue("");
      getSearchValue("");
      getRecentListView(false);
  }

  // useEffect(() => {
  //   getSearchValue("");
  // }, []);

  return (
    <>
      <div className={Style["ListFilterSearch"]}>
        <button
          className={Style["ListFilterBack"]}
          onClick={onClickBackStep}
        />
        <input
          type="submit"
          value="Search"
          className={Style["ListFilterSearch-submit"]}
        />
        <input
          type="text"
          className={Style["ListFilterSearch-text"]}
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

        {!searchValue && searchDate !== undefined && !showCloseBtn && (
          <span className={Style["ListFilterSearch-date"]}>
            {`${new Date(searchDate.start).getMonth() + 1}.${new Date(
              searchDate.start
            ).getDate()}(${week[new Date(searchDate.start).getDay()]}) - ${new Date(searchDate.end).getMonth() + 1
              }.${new Date(searchDate.end).getDate()}(${week[new Date(searchDate.end).getDay()]
              }), 
            ${adultCounterValue + childCounterValue + babyCounterValue}인`}
          </span>
        )}

        {showCloseBtn && (
          <button
            onClick={onClickClose}
            className={Style["ListFilterSearch-close"]}
            type="button"
            style={{ display: 'block' }}
          ><span className="ab-text">close</span></button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
