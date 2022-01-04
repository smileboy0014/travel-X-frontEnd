import React, { useEffect, useState } from "react";
import Styles from "../../styles/DetailTopNavbar.module.css";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useRouter } from "next/router";

const DetailTopNavbar = ({ HeaderTitle }) => {
  const router = useRouter();

  return (
    <div>
      <div>
        <div className={Styles.HeaderBack}>
          <AiOutlineLeft onClick={() => router.back()} size={30} />
        </div>
        <div className={Styles.HeaderTitle}>{HeaderTitle}</div>
        <div className={Styles.HeaderShare}>
          <AiOutlineShareAlt size={30}></AiOutlineShareAlt>
        </div>
      </div>
    </div>
  );
};

export default DetailTopNavbar;
