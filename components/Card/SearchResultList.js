import { useRef, forwardRef, useState, useEffect } from "react";
import SearchResultCarousel from "./Carousel/SearchResultCarousel";
import style from "../../styles/Carousel.module.css";
// import SearchResultCard from "./SearchResultCard";
import SearchResultCard from "./SearchCard";
import Link from "next/link";
import DetailView from "../../pages/view/detail/[id]";

const SearchResultList = (props, ref) => {
  const { rooms } = props;

  useEffect(() => {
    console.log("rooms: " + props);
  }, []);

  return (
    <>
      {rooms.item &&
        rooms.item.map((room, index) => {
          if (rooms.item.length === index + 1) {
            return <div ref={ref} key={room}></div>;
          } else {
            return (
              <div key={index}>
                <Link
                  href={{
                    pathname: "/view/detail/[id]",
                    query: { id: room.roomId },
                  }}
                  key={index}
                >
                  <a>
                    <SearchResultCard
                      id={room.roomId}
                      address={room.address}
                      baseUser={room.baseUser}
                      checkinInfo={room.checkinInfo}
                      checkoutInfo={room.checkoutInfo}
                      images={room.images}
                      lastTimeInfo={room.lastTimeInfo}
                      maxUseTimeInfo={room.maxUseTimeInfo}
                      maxUser={room.maxUser}
                      price={room.price}
                      propertyName={room.propertyName}
                      propertyType={
                        room.propertyType !== undefined
                          ? room.propertyType
                          : "N/A"
                      }
                      roomName={room.roomName}
                      stock={room.stock}
                      useType={room.useType}
                      ratingScoreAvg={
                        room.ratingScoreAvg !== undefined
                          ? room.ratingScoreAvg
                          : 0
                      }
                    />
                  </a>
                </Link>
              </div>
            );
          }
        })}
    </>
  );
};

export default forwardRef(SearchResultList);
