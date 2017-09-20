import moment from 'moment';
import isArray from 'lodash/isArray';
import map from 'lodash/map';

export const dateToString = value => {

  if (isArray(value)) {
    return map(value, dateToString);
  }

  return moment.isMoment(value) ? value.format("YYYY-MM-DD") : value;

};

export const stringToDate = value => {

  if (isArray(value)) {
    return map(value, stringToDate);
  }

  return moment(value);

};
