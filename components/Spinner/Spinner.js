import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


// export function chnageState(state) {
//   if(state){
//     Spinner.setState(state);
//   } else {
//     setTimeout(() => {
//       Spinner.setState(state);
//     }, 1500);
    
//   }
  
// }


const Spinner = () => {
  const spinnerState = useSelector((state) => state.spinnerOn.state);
  const [state, setState] = useState(false);

  // const chnageState = (state) => {
  //   if(state){
  //     setState(state);
  //   } else {
  //     setTimeout(() => {
  //       setState(state);
  //     }, 1500);     
  //   } 
  // }

  // useEffect(()=>{
  //   debugger;
  //   if(evnet){
  //     setState(evnet);
  //   } else {
  //     setTimeout(() => {
  //     setState(evnet);
  //     }, 1500);
      
  //   }
  // },[evnet])


  useEffect(() => {
    // debugger;
    setState(spinnerState);

    // if(spinnerState){
    //   setState(spinnerState);
    // } else {
    //   setTimeout(()=>{
    //     setState(spinnerState);
    //   },1500)
    // }
    
  }, [spinnerState])


  return <div id="mySpinner" style={{ display: (state ? 'block' : 'none') }}>
    <img src="/images/Loader.gif" className="spinner" />
  </div>
}

export default Spinner;