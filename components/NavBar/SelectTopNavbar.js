import React, { useEffect, useState } from "react";
import Style from "../../styles/Component.module.css";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';

const SelectTopNavbar = ({tabType}) => {
  const router = useRouter();
  const cx = classNames.bind(Style);
  const [selectType, setSelectType] = useState('beforeUse');
  const [tabList,setTabList] = useState(['beforeUse','afterUse','cancelHistory'])

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

          <li className={selectType == 'beforeUse' ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler('beforeUse')}>이용전</a>
          </li>
          <li className={selectType == 'afterUse' ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler('afterUse')}>이용완료</a>
          </li>
          <li className={selectType == 'cancelHistory' ? cx("TopTab-item", "is-Current") : cx("TopTab-item")}>
            <a className={Style["TopTab-link"]} onClick={() => onClickHandler('cancelHistory')}>취소 내역</a>
          </li>

        </ul>
      </div>
    </>
  );
};

export default SelectTopNavbar;
