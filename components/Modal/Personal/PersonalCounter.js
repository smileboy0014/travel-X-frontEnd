import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";
import Style from "../../../styles/FilterButton.module.css";
import cx from 'classnames';

export default function PersonalCounter() {
  const dispatch = useDispatch();
  const adultValue = useSelector(({ adultCounter }) => adultCounter.value);
  const childValue = useSelector(({ childCounter }) => childCounter.value);

  const adultPlus = useCallback(
    ({ adultValue }) => {
      dispatch(adultCounterActions.increment({ adultValue }));
    },
    [dispatch]
  );
  const adultMinus = useCallback(
    ({ adultValue }) => {
      dispatch(adultCounterActions.decrement({ adultValue }));
    },
    [dispatch]
  );

  const childPlus = useCallback(
    ({ childValue }) => {
      dispatch(childCounterActions.increment({ childValue }));
    },
    [dispatch]
  );
  const childMinus = useCallback(
    ({ childValue }) => {
      dispatch(childCounterActions.decrement({ childValue }));
    },
    [dispatch]
  );

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
                  disabled={adultValue == 0}
                  onClick={adultMinus}
                  className={adultValue == 0 ? Style.is_disabled_BasicCount_button_minus : Style.BasicCount_button_minus}
                >
                  <span className={Style.ab_text}>minus</span>
                </button>
                <span className={Style.BasicCount_text}>{adultValue}</span>
                <button
                  onClick={adultPlus}
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
                  disabled={childValue == 0}
                  onClick={childMinus}
                  className={childValue == 0 ? Style.is_disabled_BasicCount_button_minus : Style.BasicCount_button_minus}
                ></button>
                <span className={Style.BasicCount_text}>{childValue}</span>
                <button
                  onClick={childPlus}
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
                  disabled={adultValue == 0}
                  onClick={adultMinus}
                  className={adultValue == 0 ? Style.is_disabled_BasicCount_button_minus : Style.BasicCount_button_minus}
                ></button>
                <span className={Style.BasicCount_text}>{adultValue}</span>
                <button
                  onClick={adultPlus}
                  className={Style.BasicCount_button_plus}
                >
                  <span className={Style.ab_text}>pluse</span>
                </button>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  );
}
