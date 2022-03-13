import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResultList from "../../../components/Card/SearchResultList";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteSearch from "../../../components/InfiniteScroll/useInfiniteSearch";
import Style from "../../../styles/SearchResult.module.css";
import SearchBar from "../../search/SearchBar";
import RecentSearch from "../../search/RecentSearch";
import PersonalFilterButton from "../../../components/Button/OptionFilter/PersonalFilterButton";
import CalendarFilterButton from "../../../components/Button/OptionFilter/CalendarFilterButton";
import OptionFilterButton from "../../../components/Button/OptionFilter/OptionFilterButton";
import OrderByFilterButton from "../../../components/Button/OptionFilter/OrderByFilterButton";
import CalendarModal from "../../../components/Modal/Calendar/CalendarModal";
import ListDetailMap from "../../../components/Modal/Map/ListDetailMap";
import PullToRefresh from 'react-simple-pull-to-refresh';

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [recentListView, setRecentListView] = useState(false);
  const [listFilterIsUp, setListFilterIsUp] = useState(false);
  const [isTop,setIsTop] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);

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
    filterValue,
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

    if (yValue > lastScrollTop && yValue > navbarHeight){
      setListFilterIsUp(true);
		} else {
			if(yValue + window.outerHeight < document.documentElement.scrollHeight) {
        setListFilterIsUp(false);
			}
		}
		setLastScrollTop(scrollYValue.scrollYValue);
  }, [scrollYValue])

  useEffect(() => {
    rooms.item && console.log(rooms.item.length);
  }, [rooms]);

  return (
    <div className={Style.site}>
      <div className={Style.site_body}>
        <div id="ListFilter" className={Style.ListFilter}>
          <div className={Style.site_container}>
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
                sendTextValue={id}
                getRecentListView={(value) => {
                  setRecentListView(value);
                }}
                getSearchTxt={(value) => {
                  setSearchTxt(value);
                }}
              ></SearchBar>

              <div className={listFilterIsUp ? Style.ListFilterValue_is_up : Style.ListFilterValue}>
                <div className={Style.ListFilterValue_list}>
                  <CalendarFilterButton
                    open={() => setCalendarModalOpen(true)}
                  ></CalendarFilterButton>
                  <PersonalFilterButton></PersonalFilterButton>
                </div>
              </div>

              {!recentListView ? (
                <>
                  {searchAutoComptValue.length < 1 ? (
                    <div className={Style.ListFilterButton}>
                      <div className={Style.ListFilterButton_list}>
                        {!viewMap ? (
                          <>
                            <OptionFilterButton />
                            <OrderByFilterButton />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <>
          {viewMap == false ? (
            <>
              {recentListView ? (
                <div className={Style.TotalSearch}>
                  <div className={Style.is_Focus}>
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
                </div>
              ) : (
                <>
                  {searchAutoComptValue.length < 1 ? (
                    <div className={Style.ProductList}>
                      <div className={Style.site_container}>
                        <>
                          {rooms.item && rooms.item.length > 0 ? (
                            <PullToRefresh onRefresh={() => window.location.reload()}>
                              <ul>
                                <SearchResultList
                                  ref={lastroomElementRef}
                                  rooms={rooms}
                                />
                              </ul>
                            </PullToRefresh>
                          ) : (
                            <div className={Style.TotalSearch_noTag}>
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
                    <div className={Style.TotalSearch}>
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
          ) : (
            <ListDetailMap
              lat={37.4959854}
              lng={127.0664091}
              onRequestClosed={(value) => {
                setViewMap(!value);
              }}
            />
          )}
        </>

        {viewMap == false ? (
          <button
            className={Style.MapFixButton}
            onClick={() => setViewMap(true)}
          >
            {"지도보기"}
          </button>
        ) : (
          ""
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
