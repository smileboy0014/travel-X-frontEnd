import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "../styles/SearchResult.module.css";
import SearchBar from "../pages/search/SearchBar";
import RecentSearch from "../pages/search/RecentSearch";
import PersonalFilterButton from "../components/Button/OptionFilter/PersonalFilterButton";
import CalendarFilterButton from "../components/Button/OptionFilter/CalendarFilterButton";
import OptionFilterButton from "../components/Button/OptionFilter/OptionFilterButton";
import OrderByFilterButton from "../components/Button/OptionFilter/OrderByFilterButton";
import MapFixButton from "../components/Button/Fix/MapFixButton";
import CalendarModal from "../components/Modal/Calendar/CalendarModal";
import * as dateActions from "../redux/store/modules/date";

const search = () => {
  const [recentListView, setRecentListView] = useState(false);
  const dispatch = useDispatch();
  const { searchDate } = useSelector((state) => state.date);
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);
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
    <div className={Style.site}>
      <div className={Style.site_body}>
        <div className={Style.ListFilter}>
          <div className={Style.site_container}>
            <div>
              <SearchBar
                getSearchValue={(value) => {
                  setSearchValue(value);
                }}
                getSearchAutoComptValue={(value) => {
                  setSearchAutoComptValue(value);
                }}
                getRecentListView={(value) => {
                  setRecentListView(value);
                }}
                getSearchTxt={(value) => {
                  setSearchTxt(value);
                }}
              ></SearchBar>

              <div className={Style.ListFilterValue}>
                <div className={Style.ListFilterValue_list}>
                  <CalendarFilterButton
                    open={() => setCalendarModalOpen(true)}
                  ></CalendarFilterButton>
                  <PersonalFilterButton></PersonalFilterButton>
                </div>
              </div>

              {!recentListView ? (
                <React.Fragment>
                  {searchAutoComptValue.length < 1 ? (
                    <div className={Style.ListFilterButton}>
                      <div className={Style.ListFilterButton_list}>
                        <OptionFilterButton></OptionFilterButton>
                        <OrderByFilterButton></OrderByFilterButton>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className={Style.TotalSearch}>
          <RecentSearch
            sendSearchValue={searchValue}
            sendSearchAutoComptValue={searchAutoComptValue}
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

export default search;
