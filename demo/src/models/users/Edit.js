import React from 'react';
import { Input } from 'antd';
import { Edit, SimpleForm, FormField } from '../../../../lib';

export default (props) => (
  <Edit model="users" {...props}>
    <SimpleForm>
      <FormField source="email" input={<Input/>} options={{
        rules: [{type: "string"}, {required: true}]
      }}/>
      <FormField source="phone" input={<Input/>} />
      <FormField source="website" input={<Input/>} />
    </SimpleForm>
  </Edit>
);