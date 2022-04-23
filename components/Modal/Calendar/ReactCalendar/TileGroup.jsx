import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Style from '../../../../styles/Component.module.css'

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';
import { v4 as uuid_v4 } from "uuid";
import { useEffect } from 'react';

const tiles = [];
const init = false;

function TileGroup({
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

  for (let i=0; i < offset; i++) {
    tiles.push(
      <div className={Style["CheckCalenderBody-col"]} key={uuid_v4()}>
        <div className={Style["CheckCalenderBody-item"]}></div>
      </div>
    );
  }

  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);
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
      />
    );
  }

  tiles.push(
    <div className={Style["CheckCalenderBody-col"]} key={uuid_v4()}>
      <div className={Style["CheckCalenderBody-item"]}></div>
    </div>
  );

  const tilesLen = tiles.length;

  const getElement = (cols) => {
    return (
      <div className={Style["CheckCalenderBody-row"]} key={uuid_v4()}>
        {cols.map(tile => (
          <Fragment key={uuid_v4()}>
            {tile}
          </Fragment>
        ))}
      </div>
    )
  };

  const getTilesElements = () => {
    let elements = [];
    let cols = [];
    cols = [tiles.splice(0, offset)]

    for (let i=0; i < count-offset; i++) {
      cols.push(tiles.shift());
    }
    
    elements.push(getElement(cols));
    cols = [];
    
    for (let i=count-offset, cnt=0; i < tilesLen; i++, cnt++) {
      cols.push(tiles.shift());

      if (cnt == count-1) {
        cnt = -1;
        elements.push(getElement(cols));
        cols = [];
      }

      if (i == tilesLen-1) {
        elements.push(getElement(cols));
      }
    }
    
    return elements;
  };

  return (
    <>
      {getTilesElements()}
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

export default React.memo(TileGroup);