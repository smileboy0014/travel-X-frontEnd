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

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <a>
          <label
            className={styles.button}
            onClick={() => setSearchModalOpen(true)}
          >
            {<img src="/SearchBar2.jpg" />}
          </label>

          <SearchModal
            isOpen={searchModalOpen}
            onRequestClose={() => setSearchModalOpen(false)}
          />
        </a>

        <RoomFilterModal
          onClose={() => setShowModal(false)}
          show={showModal}
        ></RoomFilterModal>

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
              isOpen={!hasMore}
              ariaHideApp={false}
            >
              더이상 데이터가 없습니다.
            </Modal>
          </div>
        </div>

        <ScrollTopArrow></ScrollTopArrow>
      </div>
    </div>
  );
};

export default Post;
