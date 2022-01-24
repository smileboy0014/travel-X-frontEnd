import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResultList from "../../../components/Card/SearchResultList";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
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

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [recentListView, setRecentListView] = useState(false);
  const router = useRouter();
  const { id } = router.query;
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
                  <CalendarFilterButton></CalendarFilterButton>
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
                  <ul>
                    <SearchResultList ref={lastroomElementRef} rooms={rooms} />
                  </ul>
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

        <MapFixButton />
      </div>
    </div>
  );
};

export default Post;
