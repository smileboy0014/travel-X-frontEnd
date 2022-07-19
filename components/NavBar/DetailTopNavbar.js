import React, { useEffect, useState } from "react";
import Style from "../../styles/Component.module.css";
import { useRouter } from "next/router";
import ShareModal from "../Modal/Share/ShareModal";

const DetailTopNavbar = ({ HeaderTitle }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const router = useRouter();
  const onClickHandler = () =>{
    // debugger;
    if(router.route === '/myInfo'){
      router.push('/');
    } else {
      router.back();
    }
    
  }

  return (
    <>
      <button className={Style["HeaderBack"]} onClick={() => onClickHandler()}>
        <span className="ab-text">Back</span>
      </button>
      <div className={Style["HeaderTitle"]}>{HeaderTitle}</div>
      <div className={Style["HeaderShare"]}>
        <button
          type="button"
          className={Style["HeaderShare-button"]}
          onClick={() => setShareModalOpen(true)}
        >
          <span className="ab-text">share</span>
        </button>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onRequestClose={() => setShareModalOpen(false)}
      ></ShareModal>
    </>
  );
};

export default DetailTopNavbar;
