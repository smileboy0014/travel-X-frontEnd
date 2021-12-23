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
  const { books, hasMore, loading, error } = useInfiniteSearch(id, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
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
    if (books.length > 0) {
      books.map((book, index) => {
        console.log("11111111111");
        console.log(book.propertyName);
        console.log("2222222222");
      });
    }
  }, [books]);

  //검색 결과 LIST Card
  // const nameList = item.map((name, index) => (
  //   <SearchResultList
  //     propertyName={name.propertyName}
  //     roomName={name.roomName}
  //     address={name.address}
  //     propertyType={name.propertyType}
  //     images={"https://" + name.images[0]}
  //     price={name.price}
  //     index={index}
  //   />
  // ));

  return (
    <div>
      <button onClick={() => setShowModal(true)}>룸타입</button>
      <RoomFilterModal
        onClose={() => setShowModal(false)}
        show={showModal}
      ></RoomFilterModal>
      {/* <div>{id}</div> */}
      <div>
        {books.length > 0 &&
          books.map((book, index) => {
            if (books.length === index + 1) {
              return <div ref={lastBookElementRef} key={book}></div>;
            } else {
              return (
                <div key={book}>
                  <SearchResultList
                    propertyName={book.propertyName}
                    roomName={book.roomName}
                    address={book.address}
                    propertyType={book.propertyType}
                    images={"https://" + book.images[0]}
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
