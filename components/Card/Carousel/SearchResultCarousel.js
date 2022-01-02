import { useEffect, useState, useRef, forwardRef, Fragment } from 'react'
import Image from 'next/image';
import style from "../../../styles/Carousel.module.css";
import leftArrow from '../../../public/img/arrowl.png';
import rightArrow from '../../../public/img/arrowr.png';

const sampleImage = 'http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg';

const Btn = ({ direction, onClick, img, end, curSlide }) => {
  return (
    <button
      className={style.slideBtn2}
      onClick={onClick}
      direction={direction}
      style={{ left: (direction === 'prev') && '1%', right: (direction === 'next') && '1%' }}
      disabled={direction === 'prev' && curSlide === 0 || direction === 'next' && curSlide === end}
    >
      {/* <Image 
        src={direction === 'prev' ? leftArrow : rightArrow}
        alt="arrow button"
        layout="fill" 
        loading="eager"
      /> */}
      {img}
    </button>
  );
};

const SearchResultCarousel = (props, ref) => {
  const { items } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const itemLength = items ? items.length : 0;
  const slideContainerStyle = {
    width: `${items ? items.length * 600 : 600}px`,
    height: "auto",
    display: "flex",
  }

  const handleNext = () => {
    if (currentSlide >= itemLength) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(itemLength);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${(currentSlide) * 600}px)`;
    
    if (props.initSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, props.initSlide]);

  return (
    <div className={style.container} ref={ref}>
      <div ref={slideRef} style={slideContainerStyle}>
        {items && items.map((item, index) => (
          <Fragment key={index}>
            <Image
              src={item ? 'http://' + item : sampleImage}
              alt="cardImage"
              width={600}
              height={300}
              loading='eager'
            />
          </Fragment>
        ))}
      </div>
      <Btn
        direction="prev"
        onClick={handlePrev}
        img="<"
        curSlide={currentSlide} />
      <Btn
        direction="next"
        onClick={handleNext}
        img=">"
        end={itemLength-1}
        curSlide={currentSlide} />
    </div>
  )
};

SearchResultCarousel.displayName = 'SearchResultCarousel';

export default forwardRef(SearchResultCarousel);