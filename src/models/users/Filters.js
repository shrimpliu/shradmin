import React from 'react';
import { Filters, TextInput } from '../../admin';

export default (props) => (
  <Filters {...props}>
    <TextInput source="name"/>
  </Filters>
);