import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResultList from "../../../components/Card/SearchResultList";
import RoomFilterModal from "../../../components/Modal/RoomFilter/RoomFilterModal";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import useInfiniteSearch from "../../../components/InfiniteScroll/useInfiniteSearch";
import SearchModal from "../../../components/Modal/Search/SearchModal";
import styles from "../../../styles/SearchResult.module.css";
import LodingStyles from "../../../styles/LodingModal.module.css";
import Modal from "react-modal";
import SearchBar from "../../../pages/search/SearchBar";

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
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
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <a>
          <label
            className={styles.button}
            onClick={() => setSearchModalOpen(true)}
          >
            <SearchBar />
          </label>

          <SearchModal
            isOpen={searchModalOpen}
            onRequestClose={() => setSearchModalOpen(false)}
          />
        </a>

        <div>
          <SearchResultList ref={lastroomElementRef} rooms={rooms} />

          <div>
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
          </div>
        </div>

        <ScrollTopArrow></ScrollTopArrow>
      </div>
    </div>
  );
};

export default Post;
