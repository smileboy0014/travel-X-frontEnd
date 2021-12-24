import React, { useState, useRef, useCallback, useEffect } from "react";
import Axios from "axios";
import SearchResultList from "../../components/Card/SearchResultList";
import RoomFilterModal from "../../components/Modal/RoomFilter/RoomFilterModal";
import ScrollTopArrow from "../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import useInfiniteSearch from "../../components/InfiniteScroll/useInfiniteSearch";
import SearchModal from "../../components/Modal/Search/SearchModal";

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [pageNumber, setPageNumber] = useState(10);
  const { rooms, hasMore, loading, error } = useInfiniteSearch(id, pageNumber);
  const observer = useRef();
  const [showSearchModal, setshowSearchModal] = useState(false);

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
        <button onClick={() => setshowSearchModal(true)}>
          {<img src="/Search.jpg" />}
        </button>
        <SearchModal
          onClose={() => setshowSearchModal(false)}
          show={showSearchModal}
        ></SearchModal>
      </a>

      <RoomFilterModal
        onClose={() => setShowModal(false)}
        show={showModal}
      ></RoomFilterModal>

      <div>
        {rooms.item !== undefined &&
          rooms.item.map((room, index) => {
            if (rooms.item.length === index + 1) {
              return <div ref={lastroomElementRef} key={room}></div>;
            } else {
              return (
                <div key={index}>
                  <SearchResultList items={room} />
                </div>
              );
            }
          })}

        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </div>

      <ScrollTopArrow></ScrollTopArrow>
    </div>
  );
};

export default Post;
