import React, { useEffect, useState } from "react";
import Styles from "../../styles/DetailTopNavbar.module.css";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useRouter } from "next/router";

const DetailTopNavbar = () => {
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [changeStyle, setChangeStyle] = useState(Styles.DetailTopNav);
  const router = useRouter();

  useEffect(() => {
    if (scrollYValue.scrollYValue == 0) {
      setChangeStyle(Styles.DetailTopNav);
    } else if (scrollYValue.scrollYValue <= 100) {
      setChangeStyle(Styles.DetailTopNav_first);
    } else {
      setChangeStyle(Styles.DetailTopNav_second);
    }
  }, [scrollYValue]);

  return (
    <div>
      <div className={changeStyle}>
        <AiOutlineLeft onClick={() => router.back()} size={30}></AiOutlineLeft>
        <AiOutlineHome size={30}></AiOutlineHome>
        <AiOutlineShareAlt size={30}></AiOutlineShareAlt>
      </div>
    </div>
  );
};

export default DetailTopNavbar;
