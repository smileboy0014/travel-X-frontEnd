import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../styles/Component.module.css";
import DetailTopNavbar from "../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from "./../shared/js/CommonConstant";
import { CleanLoginInfoInLocalStorage } from "./../components/Button/Login/Utils/LoginUtil";
import { DeleteCookie } from './../components/Button/Login/Utils/CookieUtil';
import * as userInfoActions from "../redux/store/modules/userInfo";
import * as spinnerActions from "../redux/store/modules/spinnerOn";

const cx = classNames.bind(Style);

const MyInfo = () => {
	// debugger;
	const redirectUri = useSelector(({ redirectUri }) => redirectUri.value);
	// console.log(`redirectUri is ${redirectUri}`);
	const userInfo = useSelector((state) => state.userInfo.info);
	const nickName = userInfo.nickName;
	const auth = userInfo.auth;
	// console.log(`auth is ${auth}`);

  const dispatch = useDispatch();

	const handleLogout = () => {
    const publisher = localStorage.getItem("pub");
  
    switch (publisher) {
      case PUBLISHER_KAKAO: {
        // 카카오로 로그인된 유저 로그아웃
        if (window.Kakao.Auth.getAccessToken()) {
          window.Kakao.Auth.logout(() => {});
        }
        break;
      }
      case PUBLISHER_NAVER: {
        break;
      }
      case PUBLISHER_TRAVELX: {
        break;
      }
      default:
        
    }
      
    DeleteCookie("RT");
    CleanLoginInfoInLocalStorage(publisher);
    dispatch(userInfoActions.setUserInfo({ accessToken: null, id: null, auth: false, nickName: null, pub: null, userExtraInfo: {} }));
  };

	useEffect(() => {
    dispatch(spinnerActions.setState(false));
  }, []);

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'내정보'} />
					</div>
				</div>
			</div>
			{/* .Header *}/
		{/* Body */}
			<div className="site-body">
				{/* 컨텐츠 시작 */}
				<div className={Style["MyPage"]}>
					{/* Header */}
					<div className={Style["MyPageHeader"]}>
						<div className="site-container">
							<div className={Style["MyPageHeader-inner"]}>
								{auth ? <h2 className={Style["MyPageHeader-name"]}>{nickName? nickName:userInfo.id}</h2> :
									<Link href={{
										pathname: "/login",
										query: { redirectUri: redirectUri }
									}}>
										<h2 className={Style["MyPageHeader-name"]}>로그인 및 회원가입 하기</h2>
									</Link>}

								{auth ?
									<Link href={{
										pathname: "/myInfo/modifyMyInfo",
										// query: { redirectUri: redirectUri }
									}}>
										<a href="#;" className={Style["MyPageHeader-link"]}>내 정보 관리</a>
									</Link>
									: ''}

							</div>
						</div>
					</div>
					{/* .Header */}
					{/* MyPageMenuSec */}
					<div className={Style["MyPageMenuSec"]}>
						<div className="site-container">
							<div className={Style["MyPageMenu"]}>
								<ul className={Style["MyPageMenu-inner"]}>
								<Link href={{
										pathname: auth? "/myInfo/myReservation" : "/login",
										query: auth ? "" : { redirectUri: redirectUri },
									}}>
									<li className={Style["MyPageMenu-item"]}>
										<a href="#;" className={Style["MyPageMenu-link"]}>
											<span className={cx("MyPageMenu-text", "ico-List")}>예약 내역</span>
										</a>
									</li>
									</Link> 
									<Link href={{
										pathname: auth? "/myInfo/myReview" : "/login",
										query: auth ? "" : { redirectUri: redirectUri },
									}}>
										<li className={Style["MyPageMenu-item"]}>
											<a href="#;" className={Style["MyPageMenu-link"]}>
												<span className={cx("MyPageMenu-text", "ico-Review")}>내 리뷰</span>
											</a>
										</li>
									</Link> 
									<Link href={{
										pathname: auth? "/myInfo/myWish" : "/login",
										query: auth ? "" : { redirectUri: redirectUri },
									}}>
										<li className={Style["MyPageMenu-item"]}>
											<a href="#;" className={Style["MyPageMenu-link"]}>
												<span className={cx("MyPageMenu-text", "ico-Like")}>찜한 목록</span>
											</a>
										</li>
									</Link>
								</ul>
							</div>
						</div>
					</div>
					{/* .MyPageMenuSec */}
					{/* MyPageNavSec */}
					<div className={Style["MyPageNavSec"]}>
						<div className="site-container">
							<div className="MyPageNav">
								<ul className="MyPageNav-inner">
									<Link href={{
										pathname: "/support/faq"
									}}>
										<li className={cx("MyPageNav-item", "ico-Qna")}>
											<a href="#;" className={Style["MyPageNav-link"]}>자주 묻는 질문</a>
										</li>
									</Link>
									<Link href={{
										pathname: auth? "/support/qna" : "/login",
										query: auth ? "" : { redirectUri: redirectUri },
									}}>
										<li className={cx("MyPageNav-item", "ico-Contact")}>
											<a href="#;" className={Style["MyPageNav-link"]}>1:1 문의하기</a>
										</li>
									</Link>
									<Link href={{
										pathname: "/support/noti"
									}}>
										<li className={cx("MyPageNav-item", "ico-Notice")}>
											<a href="#;" className={Style["MyPageNav-link"]}>공지사항</a>
										</li>
									</Link>
									<Link href={{
										pathname: "/support/setting"
									}}>
										<li className={cx("MyPageNav-item", "ico-Setting")}>
											<a href="#;" className={Style["MyPageNav-link"]}>설정</a>
										</li>
									</Link>
									{/* 임시 버튼 */}
									{!auth ? (
										<Link href={{
											pathname: "/login"
										}}>
											<li className={cx("MyPageNav-item", "ico-Setting")}>
												<a href="#;" className={Style["MyPageNav-link"]}>로그인</a>
											</li>
										</Link>
									) : (
										<li className={cx("MyPageNav-item", "ico-Setting")}>
											<a href="#;" className={Style["MyPageNav-link"]} onClick={handleLogout}>로그아웃</a>
										</li>
									)}
									
									{/* 임시 버튼 */}
								</ul>
							</div>
						</div>
					</div>
					{/* MyPageNavSec */}
				</div>
				{/* .컨텐츠 끝 */}
			</div>
			{/* .Body */}
		</div>
	);
}
export default MyInfo;
