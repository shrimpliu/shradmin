import React from 'react';
import { Input } from 'antd';
import { Edit, SimpleForm, FormField, TextField } from '../../../../src';

const getFieldsValue = values => {
  return values;
};

const redirect = (model, record) => {
  return `/${model}/${record.id}/show`;
};

export default (props) => (
  <Edit model="users" getFieldsValue={getFieldsValue} redirect={redirect} {...props}>
    <SimpleForm>
      <TextField source="email" />
      <FormField source="phone" input={<Input/>} />
      <FormField source="website" input={<Input/>} />
    </SimpleForm>
  </Edit>
);