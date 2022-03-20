import React from 'react';
import PropTypes from 'prop-types';
import { getUserLocale } from 'get-user-locale';
import Style from '../../../../../styles/Component.module.css'

import {
  getCenturyLabel,
  getDecadeLabel,
  getBeginNext
} from '../shared/dates';
import {
  formatMonthYear as defaultFormatMonthYear,
  formatYear as defaultFormatYear,
} from '../shared/dateFormatter';
import { isView, isViews } from '../shared/propTypes';

const className = 'react-calendar__navigation';

export default function Navigation({
  activeStartDate,
  formatMonthYear = defaultFormatMonthYear,
  formatYear = defaultFormatYear,
  locale,
  navigationAriaLabel = '',
  navigationAriaLive,
  navigationLabel,
  showDoubleView,
  view,
  views,
}) {
  const drillUpAvailable = views.indexOf(view) > 0;
  const shouldShowPrevNext2Buttons = view !== 'century';

  const nextActiveStartDate = getBeginNext(view, activeStartDate);

  function renderLabel(date) {
    const label = (() => {
      switch (view) {
        case 'century':
          return getCenturyLabel(locale, formatYear, date);
        case 'decade':
          return getDecadeLabel(locale, formatYear, date);
        case 'year':
          return formatYear(locale, date);
        case 'month':
          return formatMonthYear(locale, date);
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    })();

    return (
      navigationLabel
        ? navigationLabel({
          date,
          label,
          locale: locale || getUserLocale(),
          view,
        })
        : label
    );
  }

  function renderButton() {
    const labelClassName = Style["CheckCalenderHeader"];
    return (
      <div
        aria-label={navigationAriaLabel}
        aria-live={navigationAriaLive}
        className={labelClassName}
        disabled={!drillUpAvailable}
        // onClick={drillUp}
        style={{ flexGrow: 1 }}
      >
        <span>
          {renderLabel(activeStartDate)}
        </span>
        {showDoubleView && (
          <>
            <span className={`${labelClassName}__divider`}>
              {' '}
              –
              {' '}
            </span>
            <span className={`${labelClassName}__labelText ${labelClassName}__labelText--to`}>
              {renderLabel(nextActiveStartDate)}
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {renderButton()}
    </div>
  );
}

Navigation.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  drillUp: PropTypes.func.isRequired,
  formatMonthYear: PropTypes.func,
  formatYear: PropTypes.func,
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  navigationAriaLabel: PropTypes.string,
  navigationAriaLive: PropTypes.string,
  navigationLabel: PropTypes.func,
  next2AriaLabel: PropTypes.string,
  next2Label: PropTypes.node,
  nextAriaLabel: PropTypes.string,
  nextLabel: PropTypes.node,
  prev2AriaLabel: PropTypes.string,
  prev2Label: PropTypes.node,
  prevAriaLabel: PropTypes.string,
  prevLabel: PropTypes.node,
  setActiveStartDate: PropTypes.func.isRequired,
  showDoubleView: PropTypes.bool,
  view: isView.isRequired,
  views: isViews.isRequired,
};
