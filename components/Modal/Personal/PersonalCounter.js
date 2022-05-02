import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";
import * as babyCounterActions from "../../../redux/store/modules/babyCounter";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const PersonalCounter = ({ onRequestClear, onSetClear, onRequestClose }) => {
  const dispatch = useDispatch();
  const adultValue = useSelector(({ adultCounter }) => adultCounter.value);
  const childValue = useSelector(({ childCounter }) => childCounter.value);
  const babyValue = useSelector(({ babyCounter }) => babyCounter.value);
  const [adultNumber, setAdultNumber] = useState(adultValue);
  const [childNumber, setChildNumber] = useState(childValue);
  const [babyNumber, setBabyNumber] = useState(babyValue);

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
    dispatch(babyCounterActions.setCount(babyNumber));

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
    <>
      <div className={Style["FilterPopBody"]}>
        <ul className="FilterNumberList">
          <li className={Style["FilterNumberList-item"]}>
            <dl className={Style["FilterNumberList-inner"]}>
              <dt className={Style["FilterNumberListTitle"]}>
                <span className={Style["FilterNumberListTitle-title"]}>성인</span>
                <span className={Style["FilterNumberListTitle-text"]}>
                  만 12세 이상
                </span>
              </dt>

              <dd className={Style["FilterNumberListCont"]}>
                <div className={Style["BasicCount"]}>
                  <button
                    disabled={adultNumber == 0}
                    onClick={adultDecreaseNumber}
                    className={adultNumber == 0 ? cx("is-disabled", "BasicCount-button", "minus") : cx("BasicCount-button", "minus")}
                  >
                    <span className="ab-text">minus</span>
                  </button>
                  <span className={Style["BasicCount-text"]}>{adultNumber}</span>
                  <button
                    onClick={adultIncreaseNumber}
                    className={cx("BasicCount-button", "plus")}
                  >
                    <span className="ab-text">plus</span>
                  </button>
                </div>
              </dd>
            </dl>
          </li>
          <li className={Style["FilterNumberList-item"]}>
            <dl className={Style["FilterNumberList-inner"]}>
              <dt className={Style["FilterNumberListTitle"]}>
                <span className={Style["FilterNumberListTitle-title"]}>어린이</span>
                <span className={Style["FilterNumberListTitle-text"]}>
                  만 2 ~ 12세
                </span>
              </dt>

              <dd className={Style["FilterNumberListCont"]}>
                <div className={Style["BasicCount"]}>
                  <button
                    disabled={childNumber == 0}
                    onClick={childDecreaseNumber}
                    className={childNumber == 0 ? cx("is-disabled", "BasicCount-button", "minus") : cx("BasicCount-button", "minus")}
                  ></button>
                  <span className={Style["BasicCount-text"]}>{childNumber}</span>
                  <button
                    onClick={childIncreaseNumber}
                    className={cx("BasicCount-button", "plus")}
                  >
                    <span className="ab-text">plus</span>
                  </button>
                </div>
              </dd>
            </dl>
          </li>
          <li className={Style["FilterNumberList-item"]}>
            <dl className={Style["FilterNumberList-inner"]}>
              <dt className={Style["FilterNumberListTitle"]}>
                <span className={Style["FilterNumberListTitle-title"]}>유아</span>
                <span className={Style["FilterNumberListTitle-text"]}>
                  만 2세 미만
                </span>
              </dt>

              <dd className={Style["FilterNumberListCont"]}>
                <div className={Style["BasicCount"]}>
                  <button
                    disabled={babyNumber == 0}
                    onClick={babyDecreaseNumber}
                    className={babyNumber == 0 ? cx("is-disabled", "BasicCount-button", "minus") : cx("BasicCount-button", "minus")}
                  ></button>
                  <span className={Style["BasicCount-text"]}>{babyNumber}</span>
                  <button
                    onClick={babyIncreaseNumber}
                    className={cx("BasicCount-button", "plus")}
                  >
                    <span className="ab-text">plus</span>
                  </button>
                </div>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div className={Style["FilterPopFooter"]}>
        <button
          className={Style["FilterPopFooter-button"]}
          onClick={handleSaveClick}
        >
          선택하기
        </button>
      </div>
    </>
  );
}
export default PersonalCounter;