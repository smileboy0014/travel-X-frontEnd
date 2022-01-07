import React, { useEffect, useState } from "react";
import Style from "../../styles/DetailTopNavbar.module.css";
import { useRouter } from "next/router";
import ShareModal from "../Modal/Share/ShareModal";

const DetailTopNavbar = ({ HeaderTitle }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className={Style.HeaderBack} onClick={() => router.back()} />
      <div className={Style.HeaderTitle}>{HeaderTitle}</div>
      <div className={Style.HeaderShare}>
        <button
          type="button"
          className={Style.HeaderShare_button}
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
