import React, { useState } from 'react';
import cardStyle from '../../../styles/ReviewCard.module.css'

const manImg = '/img/man.png';

const ReviewCard = (props) => {
  const {img, name, date, title, contents} = props;

  function handleFormattingDate(date) {
    let dateArr = date.split('T');
    return dateArr[0];
  }

  // console.log(props);
  return (
    <div className={cardStyle.cardForm}>
      <div className={cardStyle.cardHeader}>
        <div className={cardStyle.cardImg}>
        <img className="profileImg" alt="profile" src={manImg} />
        </div>
        <div>
          {name}
          <div>
            {handleFormattingDate(date)}
          </div>
        </div>
      </div>
      <div className={cardStyle.cardTitle}>
        {title}
      </div>
      <div className={cardStyle.cardBody}>
        {contents}
      </div>
    </div>
  )




}

export default ReviewCard;