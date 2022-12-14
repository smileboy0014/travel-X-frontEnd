import React from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';
import Style from '../../../../styles/CalendarModal.module.css'

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';

export default function TileGroup({
  className,
  count = 3,
  dateTransform,
  dateType,
  end,
  hover,
  offset,
  start,
  step = 1,
  tile: Tile,
  value,
  valueType,
  ...tileProps
}) {
  
  const tiles = [];
  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);
    const classes = getTileClasses({
      value, valueType, date, dateType, hover
    });

    tiles.push(
      <Tile
        key={date.getTime()}
        // classes={classes}
        classes={getTileClasses({
          value, valueType, date, dateType, hover
        })}
        date={date}
        point={point}
        value={value}
        {...tileProps}
      />,
    );
  }

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
      {convertList(tiles).map((child, index) => (
        <div className={Style.CheckCalenderBody_row} key={index}>
          {
            React.Children.map(child, (child2, index2) => (  
              <div className={Style.CheckCalenderBody_col}>
                {
                  // console.log(child2)
                }
                {
                  child2 && (
                    <div className={(
                      child2.props.classes.length == 0 ?
                      Style.CheckCalenderBody_item : 
                      Style[`${child2.props.classes[0]}_CheckCalenderBody_item`])}>
                      {
                        child2 && React.cloneElement(
                          child2,
                          {
                            ...child2.props
                          }
                        )
                      }
                </div>
                  )
                }
                
              </div>
            ))
          }
        </div>
      ))}
    </>
    // <Flex
    //   className={className}
    //   count={count}
    //   offset={offset}
    //   wrap
    // >
    //   {tiles}
    // </Flex>
  );
}

TileGroup.propTypes = {
  ...tileGroupProps,
  activeStartDate: PropTypes.instanceOf(Date),
  count: PropTypes.number,
  dateTransform: PropTypes.func.isRequired,
  dateType: PropTypes.string,
  offset: PropTypes.number,
  step: PropTypes.number,
  tile: PropTypes.func.isRequired,
};
