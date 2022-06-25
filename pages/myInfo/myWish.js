import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import axios from 'axios';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import MyWishCard from '../../components/Card/MyWishCard';


const cx = classNames.bind(Style);

const MyWish = () => {
  const router = useRouter();
	const { id } = useSelector((state) => state.userInfo.info);

  const [values, setValues] = useState([]);

  const handleClick = (item, index) => {
    
  }

  const handleBackClick = () => {
    router.back();
  };

  const getData = () => {
    let wishList = [];

    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/wish/get",
      data: id,
    }).then((res) => {
      console.log(res.data);
      wishList = res.data;
    }).catch((e) => {
      console.error(e);
    });

    return wishList;
  };

  useEffect(() => {
    // let list = [
    //   { address: "서울특별시 강남구 역삼동 626-29  24게스트하우스 강남센터",
    //     basePrice: 33000,
    //     baseUser: 3,
    //     checkinInfo: null,
    //     checkoutInfo: null,
    //     extraOptionList: [],
    //     extraPrice: 0,
    //     extraUser: 0,
    //     images: ['image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/fb5f364cc3772974bd274cfaf6ea8b9d.JPG', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/40ca8c01b967516803a1563c84049c67.JPG', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/713e45b9a811d14f9279b79340cfccae.jpg', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/06546b1cd63c4eed2891750dfda3eee8.jpg'],
    //     lastTimeInfo: null,
    //     location: {lat: 37.503902435302734, lon: 127.03339385986328},
    //     maxUseTimeInfo: null,
    //     maxUser: 5,
    //     propertyName: "24게스트하우스 강남센터",
    //     propertyType: "GUESTHOUSE",
    //     reviewSummary: {reviewCount: 6, averageCleanScore: 3.83, averageReviewScore: 3.1, averagePriceScore: 3.33, averageComfortScore: 3},
    //     roomId: "62acebe541002eaaa6685e76",
    //     roomName: "도미토리 4인실(여)",
    //     score: 11.102909,
    //     stock: 1,
    //     totalPrice: 33000,
    //     useType: "NIGHT" 
    //   },
    //   { address: "서울특별시 강남구 역삼동 626-29  24게스트하우스 강남센터",
    //     basePrice: 33000,
    //     baseUser: 3,
    //     checkinInfo: null,
    //     checkoutInfo: null,
    //     extraOptionList: [],
    //     extraPrice: 0,
    //     extraUser: 0,
    //     images: ['image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/fb5f364cc3772974bd274cfaf6ea8b9d.JPG', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/40ca8c01b967516803a1563c84049c67.JPG', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/713e45b9a811d14f9279b79340cfccae.jpg', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/06546b1cd63c4eed2891750dfda3eee8.jpg'],
    //     lastTimeInfo: null,
    //     location: {lat: 37.503902435302734, lon: 127.03339385986328},
    //     maxUseTimeInfo: null,
    //     maxUser: 5,
    //     propertyName: "24게스트하우스 강남센터",
    //     propertyType: "GUESTHOUSE",
    //     reviewSummary: {reviewCount: 6, averageCleanScore: 3.83, averageReviewScore: 3.1, averagePriceScore: 3.33, averageComfortScore: 3},
    //     roomId: "62acebe541002eaaa6685e77",
    //     roomName: "도미토리 4인실(여)",
    //     score: 11.102909,
    //     stock: 1,
    //     totalPrice: 33000,
    //     useType: "NIGHT" 
    //   },
    //   { address: "서울특별시 강남구 역삼동 626-29  24게스트하우스 강남센터",
    //     basePrice: 33000,
    //     baseUser: 3,
    //     checkinInfo: null,
    //     checkoutInfo: null,
    //     extraOptionList: [],
    //     extraPrice: 0,
    //     extraUser: 0,
    //     images: ['image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/fb5f364cc3772974bd274cfaf6ea8b9d.JPG', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/40ca8c01b967516803a1563c84049c67.JPG', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/713e45b9a811d14f9279b79340cfccae.jpg', 'image.goodchoice.kr/resize_490x348/adimg_new/11195/75184/06546b1cd63c4eed2891750dfda3eee8.jpg'],
    //     lastTimeInfo: null,
    //     location: {lat: 37.503902435302734, lon: 127.03339385986328},
    //     maxUseTimeInfo: null,
    //     maxUser: 5,
    //     propertyName: "24게스트하우스 강남센터",
    //     propertyType: "GUESTHOUSE",
    //     reviewSummary: {reviewCount: 6, averageCleanScore: 3.83, averageReviewScore: 3.1, averagePriceScore: 3.33, averageComfortScore: 3},
    //     roomId: "62acebe541002eaaa6685e78",
    //     roomName: "도미토리 4인실(여)",
    //     score: 11.102909,
    //     stock: 1,
    //     totalPrice: 33000,
    //     useType: "NIGHT" 
    //   }
    // ];

    setValues([...getData()]);
  }, []);

  return (
    <div className="site">
      <div className={Style["site-header"]}>
        <div className={"site-container"}>
          <div className={Style["Header-inner"]}>
            <a href="#;" className={Style["HeaderBack"]} onClick={handleBackClick}><span className={"ab-text"}>Back</span></a>
            <div className={Style["HeaderTitle"]}>찜한 목록</div>
          </div>
        </div>
      </div>
      {/* <!-- .Header --> */}
      {/* <!-- Body --> */}
      <div className={"site-body"}>
        {/* <!-- 컨텐츠 시작 --> */}
        <div className={cx("MyPage", "bg-Gray")}>
          {/* <!-- List --> */}
          <div className={Style["MyPageLike"]}>
            <div className={"site-container"}>
              <ul className={Style["ProductList-list"]}>
                {values && values.map((room) => {
                  return (
                    <MyWishCard
                      key={room.roomId + room.useType}
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
                      propertyName={room.propertyName}
                      propertyType={
                        room.propertyType !== undefined
                          ? room.propertyType
                          : "N/A"
                      }
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
                  )
                })}
              </ul>
            </div>
          </div>
          {/* <!-- .List --> */}
        </div>
        {/* <!-- .컨텐츠 끝 --> */}
      </div>
    </div>
  )
}

export default MyWish;