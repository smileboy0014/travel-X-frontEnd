import axios from 'axios';
import { CLIENT_SECRET, PUBLISHER_KAKAO, PUBLISHER_TRAVELX, PUBLISHER_NAVER, REST_API_KEY } from '../../../../shared/js/CommonConstant';
import { GetCookie, SetCookie } from './CookieUtil';

export const LoginToTravelXServer = async (publisher, userId, pwd = null) => {
  const result = { auth: false, id: "", status: "", nickName:"" }

  try {
    const formData = new FormData();
    formData.append('authPublisher', publisher);
    formData.append('userId', userId);
    formData.append('password', pwd);

    const res = await axios.post('http://shineware.iptime.org:8081/auth/user/get', formData);
    // console.log('TravelX Login /auth/user/get Response', res);
    
    result.auth = true;
    result.id = userId;
    // 이름 정보 안 넣어줘서 넣어 줌 by gtpark
    result.nickName = res.data.nickName;
    result.userExtraInfo = res.data.userExtraInfo;
    // debugger;
    return result;
  } catch (e) {
    // console.error(e);

    result.status = e.response.status;
    result.message = e.response.data.message;

    return result;
  }
};

export const LoginByTravelXUserToTravelXServer = async (userId, password = null) => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('password', password);

    const generateTokenResponse = await axios.post('http://shineware.iptime.org:8081/auth/user/generateToken', formData);
    // console.log('TravelX User Generate Token Response', generateTokenResponse.data);

    const tokenFormData = new FormData();
    tokenFormData.append('token', generateTokenResponse.data);
    
    const userInfoResponse = await axios.post('http://shineware.iptime.org:8081/auth/user/getUserInfo', tokenFormData);
    // console.log('TravelX User Info Response', userInfoResponse.data);
    const result = await LoginToTravelXServer(PUBLISHER_TRAVELX, userInfoResponse.data.userId, password);
    result.auth = true;

    SetLoginInfoToLocalStorage(PUBLISHER_TRAVELX, generateTokenResponse.data);

    return result;
  } catch (e) {
    // console.error(e);

    return { auth: false, message: e.response.data.message, status: e.response.status }
  }
};

export const RegisterUserToTravelXServer = async (publisher, userId, password = null) => {
  try {
    const params = {
      authPublisher: publisher,
      userId: userId,
      password: password
    };
    const registerResponse = await axios.get('http://shineware.iptime.org:8081/auth/user/register', params);
    console.log('TravelX Register User Response', registerResponse);
    // TODO: 로그인 페이지로 이동
  } catch (e) {
    if (e.response.status == '409') {
      alert('이미 등록된 사용자입니다.');
    } else {
      console.error(e);
    }
    // TODO: 메인 페이지로 이동
  }
};

export const CheckLogin = async (authPublisher) => {
  // debugger;
  let result = { auth: false, id: null };
  
  switch (authPublisher) {
    case PUBLISHER_KAKAO: 
      const accessToken = window.Kakao.Auth.getAccessToken();

      if (accessToken) {
        await window.Kakao.API.request({
          url: '/v1/user/access_token_info',
          success: async (res) => {
            // console.log(res);
            result.id = res.id;
            
          },
          fail: (e) => {
            // TODO : e값 형태 확인하기
            // debugger;
            if (e.code == 401 || (e.response && e.response.status == '401')) {
              GetNewAccessTokenByRefreshToken(PUBLISHER_KAKAO);
            } else {
              result = { auth: false, id: null };
              window.Kakao.Auth.setAccessToken(null);
              CleanLoginInfoInLocalStorage();
            }
            
            console.error(e);
          }
        });

        // 유저 정보 매핑을 위한 로그인용 API (/get) 호출
        result = await LoginToTravelXServer(PUBLISHER_KAKAO, result.id);
        // console.log(result);
        return result;
      } else {
        CleanLoginInfoInLocalStorage();
      }
      
      break;
    case PUBLISHER_NAVER: 
      
      break;
    
    case PUBLISHER_TRAVELX: 
      const token = localStorage.getItem("tx");
      const tokenFormData = new FormData();
      tokenFormData.append('token', token);
      
      try {
        const userInfoResponse = await axios.post('http://shineware.iptime.org:8081/auth/user/getUserInfo', tokenFormData);
        if (userInfoResponse.data) {
          result = { 
            auth: true, 
            id: userInfoResponse.data.userId, 
            nickName: userInfoResponse.data.nickName, 
            userExtraInfo: userInfoResponse.data.userExtraInfo 
          };
        } else 
          result = { auth: false, id: null };
        
      } catch (e) {
        result = { auth: false, id: null };
        console.error(e);
      }

      break;
    
    default:
      result = { auth: false, id: null };

  }
  
  return result;
}

export const GetNewAccessTokenByRefreshToken = async (authPublisher) => {
  switch (authPublisher) {
    case PUBLISHER_KAKAO: 
      const refreshToken = GetCookie("RT");

      if (refreshToken) {
        try {
          let bodyData = {
            'grant_type': 'refresh_token',
            'client_id': REST_API_KEY,
            'refresh_token': refreshToken,
            'client_secret': CLIENT_SECRET
          };
    
          const params = new URLSearchParams(bodyData).toString();
          const refreshResponse = await axios.post(`https://kauth.kakao.com/oauth/token`, params, {
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          });

          if (refreshResponse.data.refresh_token) {
            SetCookie("RT", refreshResponse.data.refresh_token, '/', refreshResponse.data.refresh_token_expires_in);
          }

          window.Kakao.Auth.setAccessToken(refreshResponse.data.access_token);

          console.log(refreshResponse);
        } catch(e) {
          console.log(e);
        }
      } else {
        CleanLoginInfoInLocalStorage();
      }

      break;
    case PUBLISHER_NAVER: 
      
      break;
    
    case PUBLISHER_TRAVELX: 

      break;
    
    default:

  }
}

export const SetLoginInfoToLocalStorage = (authPublisher, token = null) => {
  localStorage.setItem("pub", authPublisher);
  if (token) localStorage.setItem("tx", token);
}

export const CleanLoginInfoInLocalStorage = (authPublisher) => {
  switch (authPublisher) {
    case PUBLISHER_KAKAO:
    case PUBLISHER_NAVER: {
      break;
    }
    case PUBLISHER_TRAVELX: {
      localStorage.removeItem("tx");
      break;
    }
    default:
      
  }

  localStorage.removeItem("pub");
}

const setFormData = (formData, data, parentKey) => {
    if (!(formData instanceof FormData)) return;
    if (!(data instanceof Object)) return;
 
    Object.keys(data).forEach(key => {
        const val = data[key];
        if (parentKey) key = `${parentKey}[${key}]`;
 
        if (val instanceof Object && !Array.isArray(val)) {
            return setFormData(formData, val, key);
        }
 
        if (Array.isArray(val)) {
            val.forEach((v, idx) => {
                if (v instanceof Object) {
                    setFormData(formData, v, `${key}[${idx}]`);
                }
                else {
                    formData.append(`${key}[${idx}]`, v);
                }
            });
        }
        else {
            formData.append(key, val);
        }
    });
}