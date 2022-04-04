import { useEffect, useState } from "react";
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

  const getReviewImage = (imageId) => {
    // let url = null;

    if (!imageId.includes('.kr') && !imageId.includes('.com')) {

      Axios({
        method: "GET",
        url: getImgApiUrl,
        responseType: 'blob', // important
        params: {
          id: imageId
        },
      }).then((res) => {
        if (res.data !== undefined) {

          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          getUrlHandler(url);

          isLoading(true);
          
          // setImgSrcs([...imgSrcs, url]);
          // if(imgSrcs.length === data.length){
          //   setGetAllImg(true);
          // }
          // debugger;
          // console.log(imgSrcs);

        }
      }).catch((error) => {
        console.log(error);
      });

      // return (
      //   <img
      //     src={url && url.includes("http") ? url : "http://" + url}
      //     alt="room-img"
      //   />
      // )

    } 
    else {
      return (
        <img
          src={imageId.includes("http") ? imageId : "http://" + imageId}
          alt="room-img"
        />
      )
    }
  }

  const getUrlHandler = (url) =>{
    return(
      <img
          src={url && url}
          alt="room-img"
        />
    )
  }

  // useEffect(() => {
  //   for (let imgId of data) {
  //     if (!imgId.includes(".kr") && !imgId.includes(".com")) {

  //       Axios({
  //         method: "GET",
  //         url: getImgApiUrl,
  //         responseType: 'blob', // important
  //         params: {
  //           id: imgId
  //         },
  //       }).then((res) => {
  //         if (res.data !== undefined) {

  //           const url = window.URL.createObjectURL(new Blob([res.data]));
  //           const link = document.createElement('a');

  //           setImgSrcs([...imgSrcs, url]);

  //           debugger;
  //           console.log(`Api result is ${imgSrcs}`);

  //         }
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //     }
  //   }

  // }, [])

  const getImageHandler = (imageId) => {

    // return (
    //   <img
    //     src={imageId.includes("http")? imageId : "http://" + imageId}
    //     alt="room-img"
    //   />
    // )

    if (!imageId.includes('.kr') && !imageId.includes('.com')) {

      // getReviewImage(imageId);
      console.log(imgSrcs);

      return (
        <>
          {/* <img
          src={imageId}
          alt="room-img"
        /> */}
          {imgSrcs && imgSrcs.map((item, idx) => (
            <img
              key={idx}
              src={item}
              alt="room-img"
            />
          ))}
        </>
      )
    }
    else {
      return (
        <img
          src={"http://" + imageId}
          alt="room-img"
        />
      )
    }
  }

  return (
    isLoading && 
    <Swiper
      style={swiperStyle}
      modules={[Pagination]}
      pagination={true}
      spaceBetween={10}
      slidesPerView={3}
    >
      {data &&
        data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={Style["ReviewList"]}>
              <div className={Style["Review-link"]}>
                <div className={Style["ReviewThumb"]}>
                  <a href="#;" className="ReviewSlide-link" onClick={() => onClickHandler(data)}>
                    {isLoading && getReviewImage(item)}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ReviewDetailCarousel;
