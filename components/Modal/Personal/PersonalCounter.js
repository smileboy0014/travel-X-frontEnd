import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";

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
    <div>
      <div>
        {"성인"}
        <button onClick={adultPlus}>+</button>
        {adiltValue}
        <button onClick={adultMinus}>-</button>
        <button onClick={() => adultReset()}>리셋</button>
      </div>
      <div>
        {"어린이"}
        <button onClick={childPlus}>+</button>
        {childValue}
        <button onClick={childMinus}>-</button>
        <button onClick={() => childReset()}>리셋</button>
      </div>
    </div>
  );
}
