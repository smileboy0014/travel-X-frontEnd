import React from 'react';
import PropTypes from 'prop-types';

import Style from '../../../../styles/Component.module.css'

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';
import classNames from 'classnames/bind';
import { v4 as uuid_v4 } from "uuid";

const cx = classNames.bind(Style);

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
    console.log(date.getTime() == (new Date).getTime())
    const classes = getTileClasses({
      value, valueType, date, dateType, hover
    });

    tiles.push(
      <Tile
        key={date.getTime()}
        classes={classes}
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
      {convertList(tiles).map((child) => (
        <div className={Style["CheckCalenderBody-row"]} key={uuid_v4()}>
          {React.Children.map(child, child2 => (  
            <div className={child2 != null ?
              child2.props.classes.length == 0 ? 
              Style["CheckCalenderBody-col"] : 
              cx(child2.props.classes[0], 'CheckCalenderBody-col') : Style["CheckCalenderBody-col"]}
            >
              {/* {
                console.log(child2)
              } */}
              {child2 && (
                <div 
                  className={Style["CheckCalenderBody-item"]}
                  key={child2.key}
                >
                  {child2 && React.cloneElement(
                    child2, {...child2.props}
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
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
