import React, { useState } from 'react';
import cardStyle from '../../../styles/ReviewCard.module.css'

const manImg = '/img/man.png';

const ReviewCard = (props) => {
  const {img, name, date, content} = props;

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
            {date}
          </div>
        </div>
      </div>
      <div className={cardStyle.cardBody}>
        {content}
      </div>
    </div>
  )




}

export default ReviewCard;