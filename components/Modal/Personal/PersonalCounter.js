import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";
import Style from "../../../styles/FilterButton.module.css";

export default function PersonalCounter() {
  const dispatch = useDispatch();
  const adiltValue = useSelector(({ adultCounter }) => adultCounter.value);
  const childValue = useSelector(({ childCounter }) => childCounter.value);

  const adultPlus = useCallback(
    ({ adiltValue }) => {
      dispatch(adultCounterActions.increment({ adiltValue }));
    },
    [dispatch]
  );
  const adultMinus = useCallback(
    ({ adiltValue }) => {
      dispatch(adultCounterActions.decrement({ adiltValue }));
    },
    [dispatch]
  );

  const adultReset = useCallback(() => {
    dispatch(adultCounterActions.reset());
  }, [dispatch]);

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

  const childReset = useCallback(() => {
    dispatch(childCounterActions.reset());
  }, [dispatch]);

  return (
    <div className={Style.FilterPopBody}>
      <ul className="FilterNuberList">
        <li>
          {/* <li className={Style.FilterNumberList_item}> */}
          <dl className={Style.FilterNumberList_inner}>
            <dt className={Style.FilterNumberListTitle}>
              <span className={Style.FilterNumberListTitle_title}>성인</span>
              <span className={Style.FilterNumberListTitle_text}>
                만 12세 이상
              </span>
            </dt>

            <dd className={Style.FilterNumberListCont}>
              <div className={Style.BasicCount}>
                <button onClick={adultMinus}>-</button>
                <span className={Style.BasicCount_text}> {adiltValue}</span>
                <button onClick={adultPlus} className={Style.BasicCount_button}>
                  +
                </button>
              </div>
            </dd>
          </dl>
        </li>
        <div>
          {"어린이"}
          <button onClick={childPlus}>+</button>
          {childValue}
          <button onClick={childMinus}>-</button>
          <button onClick={() => childReset()}>리셋</button>
        </div>
      </ul>
    </div>
  );
}
