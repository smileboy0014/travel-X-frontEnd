import { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';


const LayerGallery = (props) => {
  const { data, isOpen, onRequestClose } = props;
  const [openLayerGalleryStyle, setOpenLayerGalleryStyle] = useState(false);

  const cx = classNames.bind(Style);

  const onClickHandler = () =>{
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
    <div className={Style[openLayerGalleryStyle ? cx("LayerGallery", "is-View") : "LayerGallery"]}>
      <button type="button" className={Style["LayerGallery-close"]} onClick={() => onClickHandler()}><span className="ab-text">Close</span></button>
      {/* <!-- slide --> */}
      <div className={Style["LayerGallerySlide"]}>
        <div className="swiper-container LayerGallerySlide-container">
          <div className="swiper-wrapper LayerGallerySlide-wrapper">

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
                    <div className={Style["ReviewList"]}>
                      <div className={Style["Review-link"]}>
                        <div className={Style["ReviewThumb"]}>
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

          </div>
        </div>
      </div>
    </div>
  )




}

export default LayerGallery;