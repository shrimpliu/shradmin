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

export const dateToRangeTime = value => {

  const start_date = value[0].format("YYYY-MM-DD");

  const start_time = moment.isMoment(value[0]) ? parseInt(moment(start_date).format("x"), 10) : value[0];

  const end_date = value[1].format("YYYY-MM-DD");

  const end_time = moment.isMoment(value[1]) ? (parseInt(moment(end_date).add(1, "day").format("x"), 10) - 1) : value[1];

  return [start_time, end_time];
};
