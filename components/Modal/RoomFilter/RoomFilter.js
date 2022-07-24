import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import * as propertyTypeActions from "../../../redux/store/modules/propertyType";
import Style from "../../../styles/Component.module.css";



const RoomFilter = ({ onRequestClear, onSetClear, onRequestClose, callback }) => {
  const router = useRouter();
  const [checkedValue, setCheckValue] = useState([]);
  const dispatch = useDispatch();
  const filterValue = useSelector(({propertyType}) => propertyType);

  useEffect(()=>{
    // debugger;
    setCheckValue(filterValue);
  },[filterValue]);

  const changeCheckHandler = (checked, type) => {
    if(checked){
      setCheckValue([...checkedValue, type]);
    } else {
      setCheckValue(checkedValue.filter((el) => el !== type));
    }
  };

  useEffect(() => {
    if (onRequestClear) {
      onClearClick();
    }
  }, [onRequestClear]);

  const onClearClick = () => {
    setCheckValue(filterValue);
    if (onSetClear !== undefined) {
      onSetClear(false);
    }
    // const filter = {rent:checkedRentInputs, hotel:checkedHotelInputs};
    // dispatch(roomFilterActions.sendConfirm(filter));
  };


  const sendConfirm = () => {
    // debugger;
    const filter = checkedValue;
    dispatch(propertyTypeActions.sendConfirm(filter));
    onRequestClose(false);
    callback();
    // console.log(checkedRentInputs);
    // console.log(checkedHotelInputs);
  };

  return (
    <>
      <div className={Style["FilterPopBody"]}>
        <div className={Style["FilterPopItem"]}>
          <ul className={Style["FilterPopList"]}>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style['FilterCheck']}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="HOTEL"
                  name="HOTEL"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"HOTEL");
                  }}
                  checked={checkedValue.includes("HOTEL") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>호텔</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="MOTEL"
                  name="MOTEL"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "MOTEL");
                  }}
                  checked={checkedValue.includes("MOTEL") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>모텔</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="PENSION"
                  name="PENSION"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "PENSION");
                  }}
                  checked={checkedValue.includes("PENSION") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>펜션</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="GUESTHOUSE"
                  name="GUESTHOUSE"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "GUESTHOUSE");
                  }}
                  checked={checkedValue.includes("GUESTHOUSE") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>게스트하우스</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="RESORT"
                  name="RESORT"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "RESORT");
                  }}
                  checked={checkedValue.includes("RESORT") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>리조트</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="CAMPING"
                  name="CAMPING"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "CAMPING");
                  }}
                  checked={checkedValue.includes("CAMPING") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>캠핑장</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className={Style["FilterPopFooter"]}>
        <button className={Style["FilterPopFooter-button"]} onClick={sendConfirm}>
          선택하기
        </button>
      </div>
    </>
  );
};

export default RoomFilter;
