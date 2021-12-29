import { useRef, forwardRef, useState, useEffect } from "react";
import SearchResultCarousel from "./Carousel/SearchResultCarousel";
import style from "../../styles/Carousel.module.css";
import SearchResultCard from "./SearchResultCard";
import Link from "next/link";

const SearchResultList = (props, ref) => {
  const carouselRef = useRef(null);
  const { rooms } = props;
  const [slide, setSlide] = useState(false);

  const GetRandomRatingScore = () => {
    let max = 5.0;
    let min = 2.0;
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  useEffect(() => {
    setSlide(false);
    return () => { setSlide(true); }
  }, []);

  return (
    <div className={style.container}>
      <div>
        <div>
          {rooms.item &&
            rooms.item.map((room, index) => {
              if (rooms.item.length === index + 1) {
                return <div ref={ref} key={room}></div>;
              } else {
                return (
                  <div key={index}>
                    <div style={{border: "1px solid rgb(0, 0, 0)"}}>
                      <SearchResultCarousel 
                        ref={carouselRef} 
                        items={room.images} 
                        initSlide={slide}
                        />
                      <Link
                        href="/view/detail/[id]"
                        as={`/view/detail/${room.roomId}`}
                        key={index}>
                        <a>
                          <SearchResultCard 
                            id={room.roomId}
                            roomName={room.roomName}
                            propertyName={room.propertyName}
                            images={room.images}
                            maxUser={room.maxUser}
                            price={room.price}
                            ratingScoreAvg={GetRandomRatingScore()}
                            />
                        </a>
                      </Link>
                    </div>
                  </div>    
                );
              }
            })}
        </div>
      </div>
      <p>____</p>
    </div>
  );
};

export default forwardRef(SearchResultList);