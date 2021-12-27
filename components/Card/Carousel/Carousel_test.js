import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import Image from "next/image";
import style from "../../../styles/Carousel.module.css";
import Link from "next/link";

const sampleImage =
  "http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const Btn = ({ direction, onClick, img, end, curSlide }) => {
  return (
    <button
      className={style.slideBtn}
      onClick={onClick}
      direction={direction}
      style={{
        left: direction === "prev" && "1%",
        right: direction === "next" && "1%",
      }}
      disabled={
        (direction === "prev" && curSlide === 0) ||
        (direction === "next" && curSlide === end)
      }
    >
      {/* <Image 
        src={img}
        alt="button"
      /> */}
      {img}
    </button>
  );
};

const Carousel = (props, ref) => {
  const { items } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const displayItemNum = 4;
  const slides = items.length - displayItemNum;
  const containerStyle = {
    width: `${items.length * 159.5}px`,
    height: "auto",
    display: "flex",
  };

  const handleNext = () => {
    if (currentSlide >= slides) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 4.7}%)`;
    console.log("currentSlide:", currentSlide);
    return () => {
      console.log("useEffect clean up:", currentSlide);
      // setCurrentSlide(0);
    };
  }, [currentSlide]);

  return (
    <div className={style.container} ref={ref}>
      <div ref={slideRef} style={containerStyle}>
        {items !== undefined &&
          items.map((item, i) => (
            <div className="row" key={i}>
              <div className="col">
                {/* <Link href={`/view/detail/${item.roomId}`}> */}
                <a>
                  <Image
                    src={item ? "http://" + item : sampleImage}
                    // src={sampleImage}
                    alt="cardImage"
                    width={150}
                    height={150}
                  />
                </a>
                {/* </Link> */}
              </div>
              <div className="col">{item.propertyName}</div>
            </div>
          ))}
      </div>
      <Btn
        direction="prev"
        onClick={handlePrev}
        img="<"
        curSlide={currentSlide}
      />
      <Btn
        direction="next"
        onClick={handleNext}
        img=">"
        end={slides}
        curSlide={currentSlide}
      />
    </div>
  );
};

Carousel.displayName = "Carousel";

export default forwardRef(Carousel);
