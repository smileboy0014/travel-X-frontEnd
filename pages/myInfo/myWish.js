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
	const userId = useSelector((state) => state.userInfo.info.id);

  const [values, setValues] = useState([]);
  const [roomValues, setRoomValues] = useState([]);

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
      userId: userId
    };
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/wish/get",
      params: params
    }).then((res) => {
      console.log(res.data);
      setValues([...res.data]);
      getRoomData(res.data);
    }).catch((e) => {
      console.error(e);
    });
  };

  const getRoomData = (wishs) => {
    let rooms = [];
    for (let wish of wishs) {
      axios({
        method: "GET",
        url: "http://shineware.iptime.org:8081/pdp/info",
        params: {
          roomId: wish.roomId,
          useType: wish.useType,
          checkinDate: FormattingDate(new Date()),
          checkoutDate: FormattingDate(new Date()),
          adult: 1,
          children: 0,
          baby: 0,
          userId: userId,
        },
      }).then((res) => {
        console.log(res.data);
        rooms.push(res.data);
      });
    }

    setRoomValues(rooms);
  };

  useEffect(() => {
    getData();
  }, [userId]);

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
              {roomValues.length > 0 ? (
                <ul className={Style["ProductList-list"]}>
                  {roomValues.map((room) => {
                    return (
                      <MyWishCard
                        key={room.roomId + room.useType}
                        id={room.roomId}
                        address={room.address}
                        baseUser={room.baseUser}
                        checkinInfo={room.checkinInfo}
                        checkoutInfo={room.checkoutInfo}
                        images={
                          room.images && room.images.length > 0 ? room.images : []
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