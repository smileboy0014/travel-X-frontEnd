import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { tileProps } from './shared/propTypes';
import Style from '../../../../styles/Component.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);
const now = new Date();

function getValue(nextProps, prop) {
  const { activeStartDate, date, view } = nextProps;

  return typeof prop === 'function'
    ? prop({ activeStartDate, date, view })
    : prop;
}

export default class Tile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { tileClassName, tileContent } = nextProps;

    const nextState = {};

    if (tileClassName !== prevState.tileClassNameProps) {
      nextState.tileClassName = getValue(nextProps, tileClassName);
      nextState.tileClassNameProps = tileClassName;
    }

    if (tileContent !== prevState.tileContentProps) {
      nextState.tileContent = getValue(nextProps, tileContent);
      nextState.tileContentProps = tileContent;
    }

    return nextState;
  }

  state = {};

  render() {
    const {
      activeStartDate,
      children,
      classes,
      date,
      formatAbbr,
      locale,
      maxDate,
      maxDateTransform,
      minDate,
      minDateTransform,
      onClick,
      onMouseOver,
      style,
      tileDisabled,
      view,
      value
    } = this.props;
    const { tileClassName, tileContent } = this.state;
    const isDisabled = (minDate && minDateTransform(minDate) > date)
                    || (maxDate && maxDateTransform(maxDate) < date)
                    || (tileDisabled && !tileDisabled({ activeStartDate, date, view }));

    const isToday = (date) => {
    return now.getFullYear() == date.getFullYear() && 
            now.getMonth() == date.getMonth() && 
            now.getDate() == date.getDate();
    };

    const getClassNames = () => {
      let colClass = ["CheckCalenderBody-col"];
      if (classes.length != 0) colClass.push(classes[0]);
      if (isToday(date)) colClass.push("is-Today");
  
      return cx(colClass);
    };

    return (
      <div className={getClassNames()}>
        <div className={Style["CheckCalenderBody-item"]}>
          <button
            className={!isDisabled ? Style["CheckCalenderBody-text"] : cx('is-Pass', 'CheckCalenderBody-text')}
            disabled={isDisabled}
            onClick={onClick && ((event) => onClick(date, event))}
            onFocus={onMouseOver && (() => onMouseOver(date))}
            onMouseOver={onMouseOver && (() => onMouseOver(date))}
            style={style}
            type="button"
          >
            {children}
            {tileContent}
          </button>
        </div>
      </div>
    );
  }
}

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  formatAbbr: PropTypes.func,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
};
