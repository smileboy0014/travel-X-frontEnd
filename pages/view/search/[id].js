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
  const [recentListView, setRecentListView] = useState(false);
  const [listFilterIsUp, setListFilterIsUp] = useState(false);
  const [listFilterIsNone, setListFilterIsNone] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [useType, setUseType] = useState({ DAY: true, NIGHT: true });
  // HTTP Method call 요청 했을 때 다시 리뷰 리스트 불러오는 신호 줄 수 있도록 하는 값
  const [callHttpMethod, setCallHttpMethod] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const propertyTypeValue = useSelector(({ propertyType }) => propertyType);
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [viewList, setViewList] = useState([]);
  const [toPageNumber, setToPageNumber] = useState(20);
  const [fromPageNumber, setFromPageNumber] = useState(0);
  const [roomLength, setRoomLength] = useState(0);
  const [nowLoading, setNowLoading] = useState(true);

  // const filterValue = useSelector(({ roomFilter }) => roomFilter);

  const DELTA = 5;

  useEffect(() => {
    // debugger;
    setFromPageNumber(0);
    setToPageNumber(20);

  }, [useType]);

  const { rooms, totalHitCount, hasMore, loading, error, returnCallHttpMethod } = useInfiniteSearch(
    id,
    fromPageNumber,
    toPageNumber,
    useType,
    propertyTypeValue,
    callHttpMethod
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
          setFromPageNumber(fromPageNumber + 20);
          setCallHttpMethod(true);
          console.log(`무한 스크롤 호출 API 훅 걸렸어!!!!!!!`);

        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const filterCallbackHandler = () => {
    document.body.scrollTop = 0;
    setRoomLength(0);
    dispatch(scrollY.scrollY(0));
  }

  const handleOpenListMap = () => {
    setViewMap(true);
    setListFilterIsNone(true);
  };

  const handleChangeValue = (type) => {
    // debugger;
    if (type == 'DAY') {
      setUseType((current) => {
        let newType = { ...current };
        newType.DAY = !useType.DAY;
        return newType;
      })
    } else {
      setUseType((current) => {
        let newType = { ...current };
        newType.NIGHT = !useType.NIGHT;
        return newType;
      })
    }
    filterCallbackHandler();
  }

  useEffect(() => {
    dispatch(scrollY.scrollY(0));
  }, []);

  useEffect(() => {
    // debugger;
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

    if (yValue > lastScrollTop && yValue > navbarHeight) {
      setListFilterIsUp(true);

    } else {
      if (yValue + window.outerHeight < document.body.scrollHeight || yValue == 0) {
        setListFilterIsUp(false);
      }
    }
    setLastScrollTop(scrollYValue.scrollYValue);
  }, [scrollYValue])

  useEffect(() => {
    // debugger;
    // rooms.item && console.log(`rooms length is ${rooms.item.length}`);
    // console.log(nowLoading);
    if (!nowLoading) {
      if (rooms.item !== undefined && rooms.item.length > 0) {
        setRoomLength(rooms.item.length);

        // 방 갯수가 20개 이상일 때
        // debugger;
        // if ((rooms.item.length < totalHitCount) && roomLength <= rooms.item.length) {
        if ((rooms.item.length < totalHitCount) && (roomLength != rooms.item.length )) {
          console.log('총 방 갯수가 20 이상이야!!!!!');
          // 바로 rooms 배열을 수정하려고 하면 에러가 나서 한번 새로운 배열을 만들어 주고 수정
          let list = rooms.item.map((value) => {
            return value;
          });
          // debugger;

          if (rooms.item.length < 21) {
            list.splice(rooms.item.length / 2, 0, { roomId: '' });
            setViewList(list);
          } else {
            list.splice(rooms.item.length - 20, 0, { roomId: '' });
            setViewList(list);
          }

          // list.splice(rooms.item.length-10,0,{roomId:''});
          //   setViewList(list);

        }
        // 방 갯수가 20개 보다 적을 때
        else {
          console.log('총 방 갯수가 20 미만이거나 더이상 없어!!!!!!!');
          setViewList(rooms.item);
        }

      } else {
        console.log('완전 초기화!!!');
        setViewList([]);
        // console.log(`totalhitcount는 남았지만 실제로 아닌 경우`);
      }
    }

  }, [rooms, nowLoading]);

  useEffect(() => {
    // console.log(listFilterIsUp);
  }, [listFilterIsUp]);

  useEffect(() => {
    // debugger;
    // console.log(`returnCallHttpMethod is ${returnCallHttpMethod}`);
    // console.log(`callHttpMethod is ${callHttpMethod}`);
    if (!returnCallHttpMethod) {
      setCallHttpMethod(false);
    }
  }, [returnCallHttpMethod])

  useEffect(() => {
    // debugger;
    // console.log(`loading is ${loading}`);
    // console.log(`nowLoading is ${nowLoading}`);
    setNowLoading(loading);
  }, [loading])

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
                      <ul className={Style["ListFilterButton-list"]}>

                        <li className={Style["ListFilterButton-item"]}>
                          <a className={useType.DAY ? cx("RadiusBtn", "is-Current") : cx("RadiusBtn")}
                            onClick={() => handleChangeValue('DAY')}>대실</a>
                        </li>
                        <li className={Style["ListFilterButton-item"]}>
                          <a className={useType.NIGHT ? cx("RadiusBtn", "is-Current") : cx("RadiusBtn")}
                            onClick={() => handleChangeValue('NIGHT')}>숙박</a>
                        </li>
                        <li className={Style["ListFilterButton-item"]}>
                          <OptionFilterButton typeCount={propertyTypeValue.length} callback={filterCallbackHandler} />
                        </li>
                        <li className={Style["ListFilterButton-item"]}>
                          {/* <button type="button" className={Style["RadiusSelect js-SortOpen"]}>정렬기준</button> */}
                          <OrderByFilterButton callback={filterCallbackHandler} />
                        </li>
                      </ul>
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
