import { forwardRef, useEffect } from "react";
import SearchCard from "./SearchCard";
import Link from "next/link";

const sampleImage =
  "image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

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
                    <SearchCard
                      id={room.roomId}
                      address={room.address}
                      baseUser={room.baseUser}
                      checkinInfo={room.checkinInfo}
                      checkoutInfo={room.checkoutInfo}
                      images={
                        room.images.length > 0 ? room.images : [sampleImage]
                      }
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
