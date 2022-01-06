import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResultList from "../../../components/Card/SearchResultList";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import useInfiniteSearch from "../../../components/InfiniteScroll/useInfiniteSearch";
import styles from "../../../styles/SearchResult.module.css";
import LodingStyles from "../../../styles/LodingModal.module.css";
import Modal from "react-modal";
import SearchBar from "../../search/SearchBar";
import RecentSearch from "../../search/RecentSearch";
import PersonalFilterButton from "../../../components/Button/OptionFilter/PersonalFilterButton";
import CalendarFilterButton from "../../../components/Button/OptionFilter/CalendarFilterButton";
import OptionFilterButton from "../../../components/Button/OptionFilter/OptionFilterButton";
import OrderByFilterButton from "../../../components/Button/OptionFilter/OrderByFilterButton";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import MapFixButton from "../../../components/Button/Fix/MapFixButton";

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
    setShowModal(hasMore);
  }, [hasMore]);

  useEffect(() => {
    setSearchAutoComptValue([]);
  }, [searchValue]);

  useEffect(() => {
    setRecentListView(false);
  }, [searchAutoComptValue]);

  return (
    <div className={styles.site}>
      <div className={styles.site_body}>
        <div className={styles.ListFilter}>
          <div className={styles.site_container}>
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
              ></SearchBar>
              <div className={styles.ListFilterValue}>
                <div className={styles.ListFilterValue_list}>
                  <CalendarFilterButton></CalendarFilterButton>
                  <PersonalFilterButton></PersonalFilterButton>
                </div>
              </div>

              <div className={styles.ListFilterButton}>
                <div className={styles.ListFilterButton_list}>
                  <OptionFilterButton></OptionFilterButton>
                  <OrderByFilterButton></OrderByFilterButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        {recentListView ? (
          <RecentSearch
            sendSearchValue={searchValue}
            sendSearchAutoComptValue={searchAutoComptValue}
            getSearchValue={(value) => {
              setSearchValue(value);
            }}
          />
        ) : (
          <React.Fragment>
            {searchAutoComptValue.length < 1 ? (
              <div className={styles.ProductList}>
                <div className={styles.site_container}>
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
                    <Modal
                      className={LodingStyles.Modal}
                      overlayClassName={LodingStyles.Overlay}
                      isOpen={!showModal}
                      ariaHideApp={false}
                    >
                      <label onClick={() => setShowModal(true)}>X</label>
                      <p>더이상 데이터가 없습니다.</p>
                    </Modal>
                  </>

                  <ScrollTopArrow></ScrollTopArrow>
                </div>
              </div>
            ) : (
              <RecentSearch
                sendSearchValue={searchValue}
                sendSearchAutoComptValue={searchAutoComptValue}
                getSearchValue={(value) => {
                  setSearchValue(value);
                }}
              />
            )}
          </React.Fragment>
        )}

        <MapFixButton></MapFixButton>
      </div>
    </div>
  );
};

export default Post;
