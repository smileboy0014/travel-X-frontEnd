import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";
import Style from "../../../styles/FilterButton.module.css";
import cx from 'classnames';


const PersonalCounter = ({ onRequestClear, onSetClear, onRequestClose }) => {
  const dispatch = useDispatch();
  const adultValue = useSelector(({ adultCounter }) => adultCounter.value);
  const childValue = useSelector(({ childCounter }) => childCounter.value);
  const [adultNumber, setAdultNumber] = useState(adultValue);
  const [childNumber, setChildNumber] = useState(childValue);
  const [babyNumber, setBabyNumber] = useState(0);

  const adultIncreaseNumber = () => {
    setAdultNumber(adultNumber + 1);
  };

  const adultDecreaseNumber = () => {
    if (adultNumber > 1) {
      setAdultNumber(adultNumber - 1);
    }
  };

  const childIncreaseNumber = () => {
    setChildNumber(childNumber + 1);
  };

  const childDecreaseNumber = () => {
    if (childNumber > 0) {
      setChildNumber(childNumber - 1);
    }
  };

  const babyIncreaseNumber = () => {
    setBabyNumber(babyNumber + 1);
  };

  const babyDecreaseNumber = () => {
    if (babyNumber > 0) {
      setBabyNumber(babyNumber - 1);
    }
  };

  const handleSaveClick = (e) => {
    dispatch(adultCounterActions.setCount(adultNumber));
    dispatch(childCounterActions.setCount(childNumber));

    e.preventDefault();
    onRequestClose(false);
  };


  useEffect(() => {
    if (onRequestClear) {
      onClearClick();
    }
  }, [onRequestClear]);

  const onClearClick = () => {
    setAdultNumber(1);
    setChildNumber(0);
    setBabyNumber(0);
    if (onSetClear !== undefined) {
      onSetClear(false);
    }
  };




  return (
    <div className={Style.FilterPopBody}>
      <ul className="FilterNumberList">
        <li className={Style.FilterNumberList_item}>
          <dl className={Style.FilterNumberList_inner}>
            <dt className={Style.FilterNumberListTitle}>
              <span className={Style.FilterNumberListTitle_title}>성인</span>
              <span className={Style.FilterNumberListTitle_text}>
                만 12세 이상
              </span>
            </dt>

            <dd className={Style.FilterNumberListCont}>
              <div className={Style.BasicCount}>
                <button
                  disabled={adultNumber == 0}
                  onClick={adultDecreaseNumber}
                  className={adultNumber == 0 ? Style.is_disabled_BasicCount_button_minus : Style.BasicCount_button_minus}
                >
                  <span className={Style.ab_text}>minus</span>
                </button>
                <span className={Style.BasicCount_text}>{adultNumber}</span>
                <button
                  onClick={adultIncreaseNumber}
                  className={Style.BasicCount_button_plus}
                >
                  <span className={Style.ab_text}>plus</span>
                </button>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <ul className="FilterNumberList">
        <li className={Style.FilterNumberList_item}>
          <dl className={Style.FilterNumberList_inner}>
            <dt className={Style.FilterNumberListTitle}>
              <span className={Style.FilterNumberListTitle_title}>어린이</span>
              <span className={Style.FilterNumberListTitle_text}>
                만 2 ~ 12세
              </span>
            </dt>

            <dd className={Style.FilterNumberListCont}>
              <div className={Style.BasicCount}>
                <button
                  disabled={childNumber == 0}
                  onClick={childDecreaseNumber}
                  className={childNumber == 0 ? Style.is_disabled_BasicCount_button_minus : Style.BasicCount_button_minus}
                ></button>
                <span className={Style.BasicCount_text}>{childNumber}</span>
                <button
                  onClick={childIncreaseNumber}
                  className={Style.BasicCount_button_plus}
                >
                  <span className={Style.ab_text}>pluse</span>
                </button>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <ul className="FilterNumberList">
        <li className={Style.FilterNumberList_item}>
          <dl className={Style.FilterNumberList_inner}>
            <dt className={Style.FilterNumberListTitle}>
              <span className={Style.FilterNumberListTitle_title}>유아</span>
              <span className={Style.FilterNumberListTitle_text}>
                만 2세 미만
              </span>
            </dt>

            <dd className={Style.FilterNumberListCont}>
              <div className={Style.BasicCount}>
                <button
                  disabled={babyNumber == 0}
                  onClick={babyDecreaseNumber}
                  className={babyNumber == 0 ? Style.is_disabled_BasicCount_button_minus : Style.BasicCount_button_minus}
                ></button>
                <span className={Style.BasicCount_text}>{babyNumber}</span>
                <button
                  onClick={babyIncreaseNumber}
                  className={Style.BasicCount_button_plus}
                >
                  <span className={Style.ab_text}>pluse</span>
                </button>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <div className={Style.FilterPopFooter}>
        <button
          className={Style.FilterPopFooter_button}
          onClick={handleSaveClick}
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
export default PersonalCounter;