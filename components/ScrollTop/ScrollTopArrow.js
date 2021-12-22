import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import style from "../../styles/ScrollTopArrow.module.css";

const ScrollTopArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FaArrowCircleUp
      className={style.scrollTop}
      onClick={scrollTop}
      size="40"
      style={{ height: 100, display: showScroll ? "flex" : "none" }}
    />
  );
};

export default ScrollTopArrow;
