import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResultList from "../../../components/Card/SearchResultList";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteSearch from "../../../components/InfiniteScroll/useInfiniteSearch";
import Style from "../../../styles/Component.module.css";
import SearchBar from "../../search/SearchBar";
import RecentSearch from "../../search/RecentSearch";
import PersonalFilterButton from "../../../components/Button/OptionFilter/PersonalFilterButton";
import CalendarFilterButton from "../../../components/Button/OptionFilter/CalendarFilterButton";
import OptionFilterButton from "../../../components/Button/OptionFilter/OptionFilterButton";
import OrderByFilterButton from "../../../components/Button/OptionFilter/OrderByFilterButton";
import CalendarModal from "../../../components/Modal/Calendar/CalendarModal";
import ListDetailMap from "../../../components/Modal/Map/ListDetailMap";
import * as scrollY from "../../../redux/store/modules/scrollY";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [recentListView, setRecentListView] = useState(false);
  const [listFilterIsUp, setListFilterIsUp] = useState(false);
  const [listFilterIsNone, setListFilterIsNone] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [viewList, setViewList] = useState([]);
  const [toPageNumber, setToPageNumber] = useState(10);
  const [fromPageNumber, setFromPageNumber] = useState(0);

  const filterValue = useSelector(({roomFilter}) => roomFilter);
  const DELTA = 5;

  useEffect(()=>{
    // debugger;
    setToPageNumber(10);

  },[filterValue]);

  const { rooms, hasMore, loading, error } = useInfiniteSearch(
    id,
    fromPageNumber,
    toPageNumber,
    filterValue
  );
  const observer = useRef();
  const [searchValue, setSearchValue] = useState();
  const [searchAutoComptValue, setSearchAutoComptValue] = useState([]);
  const [
    searchAutoComptPropertyNameValue,
    setSearchAutoComptPropertyNameValue,
  ] = useState([]);

  const [searchTxt, setSearchTxt] = useState("");
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [viewMap, setViewMap] = useState(false);

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

  const handleOpenListMap = () => {
    setViewMap(true);
    setListFilterIsNone(true);
  }

  useEffect(() => {
    dispatch(scrollY.scrollY(0));
  }, []);

  useEffect(() => {
    setSearchAutoComptValue([]);
  }, [searchValue]);

  useEffect(() => {
    setRecentListView(false);
  }, [searchAutoComptValue]);

  useEffect(() => {
    if (Math.abs(lastScrollTop - scrollYValue <= DELTA)) {
      return;
    }
    let yValue = scrollYValue.scrollYValue;
    let navbarHeight = document.getElementById("ListFilter").offsetHeight;

    console.log(yValue,window.outerHeight);
    console.log('document.body.scrollHeight', document.body.scrollHeight);
    if (yValue > lastScrollTop && yValue > navbarHeight){
      setListFilterIsUp(true);
		} else {
			if(yValue + window.outerHeight < document.body.scrollHeight || yValue == 0) {
        setListFilterIsUp(false);
			}
		}
		setLastScrollTop(scrollYValue.scrollYValue);
  }, [scrollYValue])

  useEffect(() => {
    rooms.item && console.log(`rooms length is ${rooms.item.length}`);
    
    if(rooms.item !== undefined && rooms.item.length > 0){
      let list = rooms.item.map((value)=>{
        return value;
      });
      list.push({});
      // debugger;
    } 
    setViewList(list);
    
  }, [rooms]);

  useEffect(() => {
    console.log(listFilterIsUp);
  }, [listFilterIsUp]);

  return (
    <div className="site">
      <div className="site-body">
        <div id="ListFilter" className={listFilterIsUp ? cx("ListFilter", "is-Up") : Style["ListFilter"]}>
          <div className="site-container">
            <>
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
                sendTextValue={id}
                getRecentListView={(value) => {
                  setRecentListView(value);
                }}
                getSearchTxt={(value) => {
                  setSearchTxt(value);
                }}
              ></SearchBar>

              <div className={listFilterIsNone ? cx("ListFilterValue", "is-None") : Style["ListFilterValue"]}>
                <div className={Style["ListFilterValue-list"]}>
                  <CalendarFilterButton
                    open={() => setCalendarModalOpen(true)}
                  ></CalendarFilterButton>
                  <PersonalFilterButton></PersonalFilterButton>
                </div>
              </div>

              {!recentListView ? (
                <>
                  {searchAutoComptValue.length < 1 ? (
                    <div className={Style["ListFilterButton"]}>
                      <div className={Style["ListFilterButton-list"]}>
                        <OptionFilterButton />
                        <OrderByFilterButton />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </>
          </div>
        </div>

        <>
          {recentListView ? (
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
              />
            </div>
          ) : (
            <>
              {searchAutoComptValue.length < 1 ? (
                <div className={Style["ProductList"]}>
                  <div className="site-container">
                    <>
                      {viewList && viewList.length > 0 && !viewMap > 0 ? (
                        <ul>
                          <SearchResultList
                            ref={lastroomElementRef}
                            rooms={viewList}
                          />
                        </ul>
                      ) : (
                        <div className={Style["TotalSearch-noTag"]}>
                          검색결과가 없습니다.
                          <p>지역, 지하철역, 숙소명을 입력해주세요.</p>
                        </div>
                      )}
                    </>
                    <>
                      {/* <Modal
                        className={LodingStyles.Modal}
                        overlayClassName={LodingStyles.Overlay}
                        isOpen={loading}
                        ariaHideApp={false}
                      >
                        Loading...
                      </Modal> */}
                    </>
                    <ScrollTopArrow></ScrollTopArrow>
                  </div>
                </div>
              ) : (
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
              )}
            </>
          )}
        </>
        
        {viewMap ? (
          <ListDetailMap
            lat={37.4959854}
            lng={127.0664091}
            onRequestClosed={(value) => {
              setViewMap(!value);
              setListFilterIsNone(false);
            }}
          />
        ) : (
          <button
            className={Style.MapFixButton}
            onClick={handleOpenListMap}
          >
            {"지도보기"}
          </button>
        )}

        {/* <MapFixButton
          onRequestViewMap={(value) => {
            viewMap(value);
          }}
 
        /> */}
        <CalendarModal
          isOpen={calendarModalOpen}
          onRequestClose={() => setCalendarModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Post;
