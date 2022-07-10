import React, { useEffect, useState } from "react";
import Style from "../../styles/Component.module.css";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';

const SelectTopNavbar = () => {
  const router = useRouter();
  const cx = classNames.bind(Style);
  const [selectIdx, setSelectIdx] = useState(0);

  const onClickHandler = (idx) => {
    // console.log(idx);
    setSelectIdx(idx);
  }

  return (
    <>
      <div className={Style["TopTab"]}>
        <ul className={Style["TopTab-list"]}>

          <li className={selectIdx == 0 ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler(0)}>이용전</a>
          </li>
          <li className={selectIdx == 1 ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler(1)}>이용완료</a>
          </li>
          <li className={selectIdx == 2 ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler(2)}>취소 내역</a>
          </li>

        </ul>
      </div>
    </>
  );
};

export default SelectTopNavbar;
