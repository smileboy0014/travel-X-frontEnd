import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { CheckLogin } from '../../components/Button/Login/Utils/LoginUtil';
import * as userInfoActions from "../../redux/store/modules/userInfo";
import * as spinnerActions from "../../redux/store/modules/spinnerOn";
import { CleanLoginInfoInLocalStorage } from '../../components/Button/Login/Utils/LoginUtil';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.info);
  
  const [authorized, setAuthorized] = useState(false);

  const privatePaths = ['/view/reserve', '/myInfo/modifyMyInfo', '/support/qna'];
  const queryPaths = ['/info'];

  const goLoginPage = () => {
    router.push({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    });
  };

  const checkPrivatePath = (path) => {
    let result = false;
    privatePaths.forEach(privatePath => {
      if (path.includes(privatePath)) {
        // console.log('found!', path);
        result = true;
      }
    });

    return result;
  };

  const authFilter = async (url) => {
    const path = url.split(/[?#]/)[0];
    const authPublisher = localStorage.getItem("pub");
    // userInfo의 ID가 없음 && Private Path인 경우 권한 체크
    if (!userInfo.id && checkPrivatePath(path)) {
      // console.log('권한 체크가 필요합니다.');
      
      if (authPublisher) {
        let checkLogin = await CheckLogin(authPublisher);
        
        if (checkLogin.auth) {
        // 로컬스토리지 값 authPublisher가 있고 로그인 유저이므로 로그인 관련 상태값 재정의 (새로고침시 발동)
          dispatch(userInfoActions.setUserInfo({
            pub: authPublisher,
            id: checkLogin.id,
            auth: true,
            nickName: checkLogin.nickName,
            userExtraInfo: checkLogin.userExtraInfo
          }));
          setAuthorized(true);

          return true;
        } else {
        // 로컬스토리지 값 authPublisher가 있지만 로그인 유저가 아니므로 로그인 관련 상태값 초기화
          CleanLoginInfoInLocalStorage();
          dispatch(userInfoActions.setUserInfo({ pub: null, id: null, auth: false, nickName: null, userExtraInfo: {} }));
          setAuthorized(false);
          if (path != '/login') goLoginPage();
          
          return false;
        }
      } else {
        setAuthorized(false);
        if (path != '/login') goLoginPage();

        return false;
      }
    } else if (authPublisher) {
      let checkLogin = await CheckLogin(authPublisher);
      console.log(checkLogin);

      if (checkLogin.auth) {
      // 로컬스토리지 값 authPublisher가 있고 로그인 유저이므로 로그인 관련 상태값 재정의 (새로고침시 발동)
        dispatch(userInfoActions.setUserInfo({
          pub: authPublisher,
          id: checkLogin.id,
          auth: true,
          nickName: checkLogin.nickName,
          userExtraInfo: checkLogin.userExtraInfo
        }));
        setAuthorized(true);

        return true;
      } else {
      // 로컬스토리지 값 authPublisher가 있지만 로그인 유저가 아니므로 로그인 관련 상태값 초기화
        CleanLoginInfoInLocalStorage();
        dispatch(userInfoActions.setUserInfo({ pub: null, id: null, auth: false, nickName: null, userExtraInfo: {} }));
        setAuthorized(true);
        
        return false;
      }
    } else {
        setAuthorized(true);

        return true;
    }

  };

  const queryFilter = (url) => {
    
    return true;
  };

  const checkFilters = (url) => {
    authFilter(url);
    queryFilter(url);
  };

  useEffect(() => {
    // on initial load - run auth check 
    checkFilters(router.asPath);

    const hideContent = () => {
      setAuthorized(false);
      dispatch(spinnerActions.setState(true));
    };
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', checkFilters)

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', checkFilters);
    }
  }, []);

  return (authorized && children);
}

export default RouteGuard;