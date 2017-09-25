import React from 'react';
import { Input } from 'antd';
import { Filters, FormField } from '../../../../lib';

export default (props) => (
  <Filters {...props}>
    <FormField source="name" input={<Input/>}/>
  </Filters>
);