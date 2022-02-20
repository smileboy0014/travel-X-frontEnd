import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as roomFilterActions from "../../../redux/store/modules/roomFilter";
import Style from "../../../styles/FilterButton.module.css";
import axios from "axios";


const RoomFilter = ({ onRequestClear, onSetClear, onRequestClose }) => {
  const router = useRouter();
  const [checkedRentInputs, setCheckedRentInputs] = useState(['fDay']);
  const [checkedHotelInputs, setCheckedHotelInputs] = useState(['HOTEL']);
  const [radioInputs, setRadioInputs] = useState("");
  const [toPageNumber, setToPageNumber] = useState(10);
  const dispatch = useDispatch();

  const filterValue = useSelector(({roomFilter}) => roomFilter);

  useEffect(()=>{
   
    if(filterValue != null && filterValue.rent != null && filterValue.rent.length > 0){
      setCheckedRentInputs(filterValue.rent);
    }

    if(filterValue != null && filterValue.hotel != null && filterValue.hotel.length > 0){
      setCheckedHotelInputs(filterValue.hotel);
    }

  },[filterValue]);

  const handleClickRadioButton = (radioBtnName) => {
    setRadioInputs(radioBtnName);
  };
  const { id } = router.query;

  const changeCheckHandler = (checked, type ,id) => {
    switch(type){
      case "rent":
        if (checked) {
          setCheckedRentInputs([...checkedRentInputs, id]);
        } else {
          setCheckedRentInputs(checkedRentInputs.filter((el) => el !== id));
        }
        break;
      case "hotel":
        if (checked) {
          setCheckedHotelInputs([...checkedHotelInputs, id]);
        } else {
          setCheckedHotelInputs(checkedHotelInputs.filter((el) => el !== id));
        }
        break;
    }
  };

  function addZero(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function FormattingDate(date) {
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (onRequestClear) {
      onClearClick();
    }
  }, [onRequestClear]);

  const onClearClick = () => {
    // setCheckedInputs([]);
    setCheckedRentInputs([]);
    setCheckedHotelInputs([]);
    if (onSetClear !== undefined) {
      onSetClear(false);
    }
  };


  const sendConfirm = () => {
    const filter = {rent:checkedRentInputs, hotel:checkedHotelInputs};
    dispatch(roomFilterActions.sendConfirm(filter));
    onRequestClose(false);

    console.log(checkedRentInputs);
    console.log(checkedHotelInputs);
  };

  return (
    <div>
      <div className={Style.FilterPopBody}>
        <div className={Style.FilterPopItem}>
          <div className={Style.FilterPopItem_title}>숙박 유형</div>
          <ul className={Style.FilterPopList}>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="hDay"
                  name="hDay"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"rent" ,"hDay");
                  }}
                  checked={checkedRentInputs.includes("hDay") ? true : false}
                />
                <span className={Style.FilterCheck_text}>대실</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="fDay"
                  name="fDay"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"rent", "fDay");
                  }}
                  checked={checkedRentInputs.includes("fDay") ? true : false}
                />
                <span className={Style.FilterCheck_text}>숙박</span>
              </label>
            </li>
          </ul>
        </div>

        <div className={Style.FilterPopItem}>
          <div className={Style.FilterPopItem_title}>숙소 유형</div>
          <ul className={Style.FilterPopList}>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="HOTEL"
                  name="HOTEL"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel" ,"HOTEL");
                  }}
                  checked={checkedHotelInputs.includes("HOTEL") ? true : false}
                />
                <span className={Style.FilterCheck_text}>호텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="MOTEL"
                  name="MOTEL"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "hotel","MOTEL");
                  }}
                  checked={checkedHotelInputs.includes("MOTEL") ? true : false}
                />
                <span className={Style.FilterCheck_text}>모텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="PENSION"
                  name="PENSION"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "PENSION");
                  }}
                  checked={checkedHotelInputs.includes("PENSION") ? true : false}
                />
                <span className={Style.FilterCheck_text}>펜션</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="GUESTHOUSE"
                  name="GUESTHOUSE"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "GUESTHOUSE");
                  }}
                  checked={checkedHotelInputs.includes("GUESTHOUSE") ? true : false}
                />
                <span className={Style.FilterCheck_text}>게스트하우스</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="RESORT"
                  name="RESORT"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "RESORT");
                  }}
                  checked={checkedHotelInputs.includes("RESORT") ? true : false}
                />
                <span className={Style.FilterCheck_text}>리조트</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="CAMPING"
                  name="CAMPING"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "CAMPING");
                  }}
                  checked={checkedHotelInputs.includes("CAMPING") ? true : false}
                />
                <span className={Style.FilterCheck_text}>캠핑장</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className={Style.FilterPopFooter}>
        <button className={Style.FilterPopFooter_button} onClick={sendConfirm}>
          선택하기
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
