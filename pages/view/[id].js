import React, { useState, useRef, useCallback, useEffect } from "react";
import Axios from "axios";
import SearchResultList from "../../components/Card/SearchResultList";
import RoomFilterModal from "../../components/Modal/RoomFilter/RoomFilterModal";
import ScrollTopArrow from "../../components/ScrollTop/ScrollTopArrow";
import { useRouter } from "next/router";
import useInfiniteSearch from "../../components/InfiniteScroll/useInfiniteSearch";

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(10);
  const { rooms, hasMore, loading, error } = useInfiniteSearch(id, pageNumber);

  const observer = useRef();
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

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>룸타입</button>
      <RoomFilterModal
        onClose={() => setShowModal(false)}
        show={showModal}
      ></RoomFilterModal>

      <div>
        {rooms.length > 0 &&
          rooms.map((room, index) => {
            if (rooms.length === index + 1) {
              return <div ref={lastroomElementRef} key={room}></div>;
            } else {
              return (
                <div key={index}>
                  <SearchResultList
                    propertyName={room.propertyName}
                    roomName={room.roomName}
                    address={room.address}
                    propertyType={room.propertyType}
                    images={"https://" + room.images[0]}
                  />
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
