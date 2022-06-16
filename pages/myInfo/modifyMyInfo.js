import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(Style);

const modifyMyInfo = () => {
	// debugger;
	const redirectUri = useSelector(({ redirectUri }) => redirectUri.value);
	console.log(`redirectUri is ${redirectUri}`);
	const { auth } = useSelector((state) => state.userInfo.info);
	console.log(`auth is ${auth}`);

	return (
	<div>
		내 정보 관리
	</div>
	);
}
export default modifyMyInfo;
