import React, { useEffect, useState } from "react";
import Style from "../../styles/DetailTopNavbar.module.css";
import { useSelector } from "react-redux";
import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineShareAlt,
} from "react-icons/ai";

import { useRouter } from "next/router";
import ShareModal from "../Modal/Share/ShareModal";

const DetailTopNavbar = ({ HeaderTitle }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <AiOutlineLeft
        className={Style.HeaderBack}
        size={30}
        onClick={() => router.back()}
      ></AiOutlineLeft>

      <dev className={Style.HeaderTitle}>{HeaderTitle}</dev>
      <div className={Style.HeaderShare}>
        <AiOutlineShareAlt
          className={Style.HeaderShare_button}
          size={30}
          onClick={() => setShareModalOpen(true)}
        />
      </div>
      <ShareModal
        isOpen={shareModalOpen}
        onRequestClose={() => setShareModalOpen(false)}
      ></ShareModal>
    </>
  );
};

export default DetailTopNavbar;
