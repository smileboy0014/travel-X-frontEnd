import React, { useEffect, useState } from "react";
import Style from "../../styles/Component.module.css";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';

const SelectTopNavbar = ({tabType}) => {
  const router = useRouter();
  const cx = classNames.bind(Style);
  const [selectType, setSelectType] = useState('reserved');
  // const [tabList,setTabList] = useState(['reserved','used','canceled']);

  const onClickHandler = (type) => {
    // console.log(idx);
    setSelectType(type);
  }

  useEffect(()=>{
    // debugger;
    tabType(selectType);
  },[selectType])

  return (
    <>
      <div className={Style["TopTab"]}>
        <ul className={Style["TopTab-list"]}>

          <li className={selectType == 'reserved' ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler('reserved')}>예약 완료</a>
          </li>
          <li className={selectType == 'used' ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler('used')}>이용 완료</a>
          </li>
          <li className={selectType == 'canceled' ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler('canceled')}>취소 내역</a>
          </li>

        </ul>
      </div>
    </>
  );
};

export default SelectTopNavbar;
