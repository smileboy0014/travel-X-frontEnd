import React, { useState, useRef, useCallback, useEffect } from "react";
import Axios from "axios";
import SearchResultList from "../../../components/Card/SearchResultList";
import RoomFilterModal from "../../../components/Modal/RoomFilter/RoomFilterModal";
import ScrollTopArrow from "../../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import useInfiniteSearch from "../../../components/InfiniteScroll/useInfiniteSearch";
import SearchModal from "../../../components/Modal/Search/SearchModal";

import styles from "../../../styles/Index.module.css";

import Link from "next/link";

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [pageNumber, setPageNumber] = useState(10);
  const { rooms, hasMore, loading, error } = useInfiniteSearch(id, pageNumber);
  const observer = useRef();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const lastroomElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
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
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </div>

      <ScrollTopArrow></ScrollTopArrow>
    </div>
  );
};

export default Post;
