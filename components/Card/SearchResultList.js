import { forwardRef, useEffect, Fragment } from "react";
import SearchCard from "./SearchCard";
import {propertyTypeFilter} from '../../shared/js/CommonFilter';
import {priceComma}  from '../../shared/js/CommonFun';

const sampleImage =
  "image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const SearchResultList = (props, ref) => {
  // debugger;
  const { rooms } = props;
  // console.log(`SRP 룸 갯수는 ${rooms.length} 이다!!!!!`);

 

  return (
    <>
      {rooms &&
        rooms.map((room, index) => {
          // 필요없는 로직
          if (room.roomId != undefined && room.roomId === '') {
            return <div ref={ref} key={room}></div>;
          } else { 
          return (
            <Fragment key={index}>
              {/* <Link
                  href={{
                    pathname: "/view/detail/[id]",
                    query: { id: room.roomId },
                  }}
                  key={index}
                > */}
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
                totalPrice={priceComma(room.totalPrice)}
                basePrice={priceComma(room.basePrice)}
                extraPrice={priceComma(room.extraPrice)}
                propertyName={room.propertyName}
                propertyType={propertyTypeFilter(room.propertyType)}
            
                // propertyType={
                //   room.propertyType !== undefined
                //     ? room.propertyType
                //     : "N/A"
                // }
                roomName={room.roomName}
                stock={room.stock}
                useType={room.useType}
                averageScore={
                  room.reviewSummary != null ?
                    room.reviewSummary.averageReviewScore !== undefined
                      ? room.reviewSummary.averageReviewScore
                      : 0
                    : 0
                }
                reviewCount={
                  room.reviewSummary != null ?
                    room.reviewSummary.reviewCount !== undefined
                      ? room.reviewSummary.reviewCount
                      : 0
                    : 0
                }
              />
              {/* </Link> */}
            </Fragment>
          );
        }
           }
        )}
    </>
  );
};

export default forwardRef(SearchResultList);
