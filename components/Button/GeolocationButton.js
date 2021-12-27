import { useEffect } from 'react'

const GeolocationButton = (props) => {
  const buttonClickHandler = () => {
    props.showSelectSearchLocationModal();
  }

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(() => {

      }, (e) => {
        console.error(e);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }, [])

  return (
    <button onClick={buttonClickHandler}>위치 정보 가져오기</button>
  )
}

export default GeolocationButton;