import React, { useState, useEffect } from 'react'
import style from '../../styles/Progressbar.module.css'

const ProgressBar = ({ width, percent }) => {

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(percent * width);
  });

  const progress = percent * width;

  return (
    <div className={style.progressDiv} style={{ width: width }}>
      <div style={{ width: `${progress}px` }} className={style.progress} />
    </div>)

}

export default ProgressBar;