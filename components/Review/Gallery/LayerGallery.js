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

const modalStyle = {

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }

}

const LayerGallery = (props) => {
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
                      <a href="#;" className="ReviewSlide-link">
                        <img
                          src={"http://" + item}
                          alt="room-img"
                        />
                      </a>
                    </div>


                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* <div className="LayerGallerySlide-slide swiper-slide">
                  <div className="LayerGallerySlide-thumb">
                    <a href="#;" className="LayerGallerySlide-link">
                      <img src="../assets/images/dummy/Mask Group@2x.png" alt="" />
                    </a>
                  </div>
                </div>

                <div className="LayerGallerySlide-slide swiper-slide">
                  <div className="LayerGallerySlide-thumb">
                    <a href="#;" className="LayerGallerySlide-link">
                      <img src="../assets/images/dummy/Mask Group@2x.png" alt="" />
                    </a>
                  </div>
                </div> */}

      </Modal>
    </>

  )




}

export default LayerGallery;