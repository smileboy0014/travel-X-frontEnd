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
	const userInfo = useSelector((state) => state.userInfo.info);

  const [rooms, setRooms] = useState([]);

  const handleClick = (item, index) => {
    
  }

  const handleBackClick = () => {
    router.back();
  };

  function addZero(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function FormattingDate(date) {
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  const getData = () => {
    let params = {
      userId: userInfo.id,
      authPublisher: userInfo.pub
    };
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/wish/get",
      params: params
    }).then((res) => {
      console.log(res.data);
      setRooms([...res.data]);
    }).catch((e) => {
      console.error(e);
    });
  };

  useEffect(() => {
    getData();
  }, [userInfo.id]);

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
              {rooms.length > 0 ? (
                <ul className={Style["ProductList-list"]}>
                  {rooms.map((room) => {
                    return (
                      room.roomDocument ? (
                        <MyWishCard
                          key={room.roomDocument.roomId + room.roomDocument.useType}
                          id={room.roomDocument.roomId}
                          address={room.roomDocument.address}
                          baseUser={room.roomDocument.baseUser}
                          images={
                            room.roomDocument.images && room.roomDocument.images.length > 0 ? room.roomDocument.images : []
                          }
                          maxUser={room.roomDocument.maxUser}
                          propertyName={room.roomDocument.propertyName}
                          propertyType={
                            room.roomDocument.propertyType !== undefined
                              ? room.roomDocument.propertyType
                              : "N/A"
                          }
                          roomName={room.roomDocument.roomName}
                          useType={room.roomDocument.useType}
                          averageScore={
                            room.roomDocument.reviewSummary != null ?
                              room.roomDocument.reviewSummary.averageReviewScore !== undefined
                                ? room.roomDocument.reviewSummary.averageReviewScore
                                : 0
                              : 0
                          }
                          reviewCount={
                            room.roomDocument.reviewSummary != null ?
                              room.roomDocument.reviewSummary.reviewCount !== undefined
                                ? room.roomDocument.reviewSummary.reviewCount
                                : 0
                              : 0
                          }
                        />
                      ) : null
                    )
                  })}
                </ul>
              ) : (
                <div className={Style["TotalSearch-noTag"]}>찜한 내역이 없습니다.<br />마음에 드는 숙소를 찜해보세요!</div>
              )}
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