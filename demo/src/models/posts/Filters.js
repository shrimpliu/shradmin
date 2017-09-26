import React from 'react';
import { InputNumber, DatePicker } from 'antd';
import { Filters, FormField, dateToString, stringToDate } from '../../../../src';
const { RangePicker } =  DatePicker;

export default (props) => (
  <Filters {...props}>
    <FormField source="userId" input={<InputNumber />}/>
    <FormField source="range" input={<RangePicker format="YYYY-MM-DD"/>} format={stringToDate} parse={dateToString}/>
  </Filters>
);