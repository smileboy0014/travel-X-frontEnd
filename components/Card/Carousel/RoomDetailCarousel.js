import { useEffect, useState, useRef, forwardRef, Fragment } from 'react'
import Image from 'next/image';
import style from "../../../styles/Carousel.module.css";
import DetailAllImageModal from './../../Modal/RoomDetail/DetailAllImageModal';
import reactDom from 'react-dom';

const sampleImage = 'http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg';

const Btn = ({ direction, onClick, end, curSlide }) => {
  return (
    <button
      className={direction === 'prev' ? style.pdpSlidePrevBtn : style.pdpSlideNextBtn}
      onClick={onClick}
      direction={direction}
      style={{ left: (direction === 'prev') && '1%', right: (direction === 'next') && '1%' }}
      disabled={direction === 'prev' && curSlide === 0 || direction === 'next' && curSlide === end}
    />
  );
};

const SearchResultCarousel = (props, ref) => {
  const { items } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailAllImageModal, setOpenDetailAllImageModal] = useState(false);
  const slideRef = useRef(null);
  const itemLength = items ? items.length : 0;
  const slideContainerStyle = {
    width: `${items ? items.length * 800 : 800}px`,
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
    slideRef.current.style.transition = 'all 300ms ease 0s';
    slideRef.current.style.transform = `translateX(-${(currentSlide) * 800}px)`;
    if (props.initSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, props.initSlide]);

  useEffect(() => {
    if (openDetailAllImageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [openDetailAllImageModal])

  return (
    <Fragment>
      <div className={style.pdpContainer} ref={ref}>
        <div ref={slideRef} style={slideContainerStyle}>
          {items && items.map((item, index) => (
            <Fragment key={index}>
              <Image
                src={item ? 'http://' + item : sampleImage}
                alt="cardImage"
                width={800}
                height={600}
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
        <button className={style.pdpAllImageBtn} onClick={() => setOpenDetailAllImageModal(true)}>사진 전체 보기</button>
      </div>
      <DetailAllImageModal
        isOpen={openDetailAllImageModal}
        onRequestClose={() => setOpenDetailAllImageModal(false)}
        images={items}
      ></DetailAllImageModal>
    </Fragment>
  )
};

SearchResultCarousel.displayName = 'SearchResultCarousel';

export default forwardRef(SearchResultCarousel);