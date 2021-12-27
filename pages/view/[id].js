import React, { useState, useRef, useCallback, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import RoomFilterModal from "../../components/Modal/RoomFilter/RoomFilterModal";
import ScrollTopArrow from "../../components/ScrollTop/ScrollTopArrow";
import useInfiniteSearch from "../../components/InfiniteScroll/useInfiniteSearch";
import SearchRoomCard from "../../components/Card/SearchRoomCard";
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

  const GetRandomRatingScore = () => {
    let max = 5.0;
    let min = 2.0;
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

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

      <Fragment>
        {rooms && 
          rooms.map((room, index) => {
            if (rooms.length === index + 1) {
              return <div ref={lastroomElementRef} key={room}></div>;
            } else {
              return (
                <Fragment key={index}>
                  <SearchRoomCard
                    id={room.roomId}
                    roomName={room.roomName}
                    propertyName={room.propertyName}
                    images={room.images}
                    maxUser={room.maxUser}
                    price={room.price}
                    ratingScoreAvg={GetRandomRatingScore()}
                  />
                  <p>---------------------------------------</p>
                </Fragment>
              );
            }
          })}
        <div>{!loading && rooms.length === 0 && "조회된 데이터가 없습니다."}</div>
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </Fragment>

      <ScrollTopArrow></ScrollTopArrow>
    </div>
  );
};

export default Post;
