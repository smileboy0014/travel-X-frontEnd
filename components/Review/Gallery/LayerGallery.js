import { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';

const LayerGallery = (props) => {
  // debugger;
  const { data, isOpen, onRequestClose } = props;
  const [openLayerGalleryStyle, setOpenLayerGalleryStyle] = useState(false);

  const cx = classNames.bind(Style);

  const onClickHandler = () => {
    onRequestClose(false);
  }

  useEffect(() => {
    if (isOpen) {
      setOpenLayerGalleryStyle(true);
    } else {
      setOpenLayerGalleryStyle(false);
    }

  }, [isOpen]);


  // console.log(props);
  return (
    <>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        className={Style["LayerGalleryModal"]}
        overlayClassName={Style["LayerGalleryOverlay"]}
        onRequestClose={() => onRequestClose(false)}
      >
        {/* <div className={Style["LayerGallery"]}> */}
        <button
          className={Style["LayerGallery-close"]}
          onClick={() => onRequestClose(false)}
        />
        <Swiper
          modules={[Pagination]}
          pagination={true}
          // loop={true}
          // spaceBetween={10}
          slidesPerView={1}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}

        // className="swiper-container"
        >
          {data &&
            data.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={Style["GalleryList"]}>
                  <div className={Style["Gallery-link"]}>
                    <div className={Style["GalleryThumb"]}>
                      {/* <a href="123" className="ReviewSlide-link"> */}
                        <img
                          // src={(!item.includes(".kr") && !item.includes(".com")) ? item : "http://" + item}
                          src={"http://" + item}
                          alt="room-img"
                        />
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Modal>
    </>

  )




}

export default LayerGallery;