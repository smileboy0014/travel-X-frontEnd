import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResultList from "../../../components/Card/SearchResultList";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteSearch from "../../../components/InfiniteScroll/useInfiniteSearch";
import Style from "../../../styles/SearchResult.module.css";
import LodingStyles from "../../../styles/CommonModal.module.css";
import Modal from "react-modal";
import SearchBar from "../../search/SearchBar";
import RecentSearch from "../../search/RecentSearch";
import PersonalFilterButton from "../../../components/Button/OptionFilter/PersonalFilterButton";
import CalendarFilterButton from "../../../components/Button/OptionFilter/CalendarFilterButton";
import OptionFilterButton from "../../../components/Button/OptionFilter/OptionFilterButton";
import OrderByFilterButton from "../../../components/Button/OptionFilter/OrderByFilterButton";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import MapFixButton from "../../../components/Button/Fix/MapFixButton";
import SearchMapModal from "../../../components/Modal/Map/SearchMapModal";
import CalendarModal from "../../../components/Modal/Calendar/CalendarModal";
import * as dateActions from "../../../redux/store/modules/date";

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [recentListView, setRecentListView] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { searchDate } = useSelector((state) => state.date);
  const [toPageNumber, setToPageNumber] = useState(10);
  const [fromPageNumber, setFromPageNumber] = useState(0);
  const { rooms, hasMore, loading, error } = useInfiniteSearch(
    id,
    fromPageNumber,
    toPageNumber
  );
  const observer = useRef();
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const lastroomElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setToPageNumber(toPageNumber + 10);
          setFromPageNumber(fromPageNumber + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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

  useEffect(() => {
    rooms.item && console.log(rooms.item.length);
  }, [rooms]);

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
                sendTextValue={id}
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
        {recentListView ? (
          <div className={Style.TotalSearch}>
            <div className={Style.is_Focus}>
              <RecentSearch
                sendSearchValue={searchValue}
                sendSearchAutoComptValue={searchAutoComptValue}
                getSearchValue={(value) => {
                  setSearchValue(value);
                }}
              />
            </div>
          </div>
        ) : (
          <React.Fragment>
            {searchAutoComptValue.length < 1 ? (
              <div className={Style.ProductList}>
                <div className={Style.site_container}>
                  <React.Fragment>
                    {rooms.item && rooms.item.length > 0 ? (
                      <ul>
                        <SearchResultList
                          ref={lastroomElementRef}
                          rooms={rooms}
                        />
                      </ul>
                    ) : (
                      <div className={Style.TotalSearch_noTag}>
                        검색결과가 없습니다.
                        <p>지역, 지하철역, 숙소명을 입력해주세요.</p>
                      </div>
                    )}
                  </React.Fragment>{" "}
                  <>
                    <Modal
                      className={LodingStyles.Modal}
                      overlayClassName={LodingStyles.Overlay}
                      isOpen={loading}
                      ariaHideApp={false}
                    >
                      Loading...
                    </Modal>
                  </>
                  <ScrollTopArrow></ScrollTopArrow>
                </div>
              </div>
            ) : (
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
            )}
          </React.Fragment>
        )}

        {rooms.length > 0 ? <MapFixButton /> : ""}
        <CalendarModal
          isOpen={calendarModalOpen}
          onRequestClose={() => setCalendarModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Post;
