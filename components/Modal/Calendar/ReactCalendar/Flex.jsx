import React from 'react';
import PropTypes from 'prop-types';
import Style from '../../../../styles/CalendarModal.module.css'
import cx from 'classnames';

function toPercent(num) {
  return `${num}%`;
}

export default function Flex({
  children,
  className,
  direction,
  count,
  offset,
  style,
  wrap,
  ...otherProps
}) {
  function convertList(list) {
    let bodyList = [];
    let row = [];
    let col = [];

    for (let i=0; i<offset; i++) {
      row.push(null);
    }
    for (let i=0; i<count-offset; i++) {
      row.push(list[i]);
    }
    bodyList.push(row);
    
    for (let i=count-offset, cnt = 0; i<list.length; i++, cnt++) {
      col.push(list[i]);
      if (cnt == count-1) {
        cnt = -1;
        bodyList.push(col);
        col = [];
      }

      if (i==list.length-1) {
        col.push(null);
        bodyList.push(col);
      }
    }
    
    return bodyList;
  }

  return (
    <>
      {convertList(children).map((child, index) => (
        <div className={Style.CheckCalenderBody_row} key={index}>
          {
            React.Children.map(child, (child2, index2) => (  
              <div className={Style.CheckCalenderBody_col}>
                <div className={index2 == 6 ? Style.isStart_CheckCalenderBody_item : Style.CheckCalenderBody_item}>
                  {
                    child2 && React.cloneElement(
                      child2,
                      {
                        ...child2.props
                      }
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      ))}
    </>
  );
}

Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  direction: PropTypes.string,
  offset: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  wrap: PropTypes.bool,
};
