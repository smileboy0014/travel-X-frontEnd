import React, { useEffect } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";

const Kakao = () => {
  const key = "168bcdc445ab7e1c1299427f8be5d700";

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init(key);
      }
      window.Kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "카카오 공유테스트",
          description: "카카오 공유테스트",
          imageUrl:
            "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          link: {
            mobileWebUrl: "https://www.naver.com/",
            webUrl: "https://www.naver.com/",
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: "https://www.naver.com/",
              webUrl: "https://www.naver.com/",
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: "https://www.naver.com/",
              webUrl: "https://www.naver.com/",
            },
          },
        ],
      });
    }
  }, []);

  const onClickKakao = () => {
    window.open("https://sharer.kakao.com/talk/friends/picker/link");
  };

  return (
    <div id={"kakao-link-btn"}>
      <button onClick={onClickKakao}>카카오</button>
    </div>
  );
};

export default Kakao;
