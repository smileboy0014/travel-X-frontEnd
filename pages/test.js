import Navigation from "../components/Navigation";
import React, { useEffect, useState } from "react";

const test = () => {
  const [scrollY, setScrollY] = useState(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  useEffect(() => {
    console.log("스크롤:" + scrollY);
  }, [scrollY]);

  return <div>{"스크롤"}</div>;
};

export default test;
