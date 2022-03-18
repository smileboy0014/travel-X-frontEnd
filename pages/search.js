import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "../styles/Component.module.css";
import SearchBar from "./search/SearchBar";
import RecentSearch from "./search/RecentSearch";
import PersonalFilterButton from "../components/Button/OptionFilter/PersonalFilterButton";
import CalendarFilterButton from "../components/Button/OptionFilter/CalendarFilterButton";
import MapFixButton from "../components/Button/Fix/MapFixButton";
import CalendarModal from "../components/Modal/Calendar/CalendarModal";
import * as dateActions from "../redux/store/modules/date";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const Search = () => {
  const [recentListView, setRecentListView] = useState(false);
  const dispatch = useDispatch();
  const { searchDate } = useSelector((state) => state.date);
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);
  const [
    searchAutoComptPropertyNameValue,
    setSearchAutoComptPropertyNameValue,
  ] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  useEffect(() => {
    setSearchAutoComptValue([]);
  }, [searchValue]);

  useEffect(() => {
    setRecentListView(false);
  }, [searchAutoComptValue]);

  useEffect(() => {
    dispatch(
      dateActions.setDetailDate({
        start: searchDate.start,
        end: searchDate.end,
      })
    );
  }, []);

  return (
    <div className="site">
      <div className="site-body">
        <div className={Style["ListFilter"]}>
          <div className="site-container">
            <div>
              <SearchBar
                getSearchValue={(value) => {
                  setSearchValue(value);
                }}
                getSearchAutoComptValue={(value) => {
                  setSearchAutoComptValue(value);
                }}
                getSearchAutoComptPropertyNameValue={(value) => {
                  setSearchAutoComptPropertyNameValue(value);
                }}
                getRecentListView={(value) => {
                  setRecentListView(value);
                }}
                getSearchTxt={(value) => {
                  setSearchTxt(value);
                }}
              ></SearchBar>

              <div className={Style["ListFilterValue"]}>
                <div className={Style["ListFilterValue-list"]}>
                  <CalendarFilterButton
                    open={() => setCalendarModalOpen(true)}
                  ></CalendarFilterButton>
                  <PersonalFilterButton></PersonalFilterButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("TotalSearch", "is-Focus")}>
          <RecentSearch
            sendSearchValue={searchValue}
            sendSearchAutoComptValue={searchAutoComptValue}
            sendSearchAutoComptPropertyNameValue={
              searchAutoComptPropertyNameValue
            }
            getSearchValue={(value) => {
              setSearchValue(value);
            }}
            sendSearchTxt={searchTxt}
          />
        </div>

        <MapFixButton />
        <CalendarModal
          isOpen={calendarModalOpen}
          onRequestClose={() => setCalendarModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Search;
