import { useEffect, useState, Fragment } from "react";
import Style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Axios from "axios";
import Modal from "react-modal";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';

const getImgApiUrl = "http://shineware.iptime.org:8081/image/get";

const swiperStyle = {
  width: "40%",
  height: "100%",
  marginLeft: "0px"
}

const ReviewDetailCarousel = ({ data, galleryData }) => {
  // console.log(`props data is ${data}`);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgSrcs, setImgSrcs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = (data) => {
    galleryData(data);
  }

  useEffect(() => {
    let imgList = [];
    for (let imgId of data) {
      if (!imgId.includes(".kr") && !imgId.includes(".com")) {

        Axios({
          method: "GET",
          url: getImgApiUrl,
          responseType: 'blob', // important
          params: {
            id: imgId
          },
        }).then((res) => {
          if (res.data !== undefined) {

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');

            // setImgSrcs([...imgSrcs, url]);
            imgList.push(url);

            // debugger;
            // console.log(`Api result is ${imgSrcs}`);

          }
        }).catch((error) => {
          console.log(error);
        });
      }
    }
    // console.log(imgList);
    setImgSrcs(imgList);


  }, [])

  useEffect(() => {
    // console.log('imgSrc!!!>>>', imgSrcs)
    setIsLoading(true);
  }, [imgSrcs])

  const showImageHandler = () => {

    let urlImageIs = false;

    for (let imgId of data) {
      if (imgId.includes(".kr") || imgId.includes(".com")) {
        urlImageIs = true;
      }
    }

    if (urlImageIs) {
      return (
        <>
          {data && data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={Style["ReviewList"]}>
                <div className={Style["Review-link"]}>
                  <div className={Style["ReviewThumb"]}>
                    <a href="#" className="ReviewSlide-link" onClick={() => onClickHandler(data)}>
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
        </>
      )

    } else {
      return (
        <>
          {imgSrcs &&
            imgSrcs.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={Style["ReviewList"]}>
                  <div className={Style["Review-link"]}>
                    <div className={Style["ReviewThumb"]}>
                      <a href="#" className="ReviewSlide-link" onClick={() => onClickHandler(imgSrcs)}>
                        <img
                          src={item}
                          alt="room-img"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </>
      )
    }
  }

  return (
    isLoading && <Swiper
      style={swiperStyle}
      modules={[Pagination]}
      pagination={true}
      spaceBetween={10}
      slidesPerView={3}
    >
      {showImageHandler()}
    </Swiper>
  );
};

export default ReviewDetailCarousel;