import React from 'react';
import { Input } from 'antd';
import { Create, SimpleForm, FormField } from '../../../../lib';

export default (props) => (
  <Create model="users" {...props}>
    <SimpleForm>
      <FormField source="name" input={<Input/>} options={{
        rules: [{type: "string"}, {required: true}]
      }} />
      <FormField source="username" input={<Input/>} options={{
        rules: [{type: "string"}, {required: true}]
      }}/>
      <FormField source="email" input={<Input/>} options={{
        rules: [{type: "string"}, {required: true}]
      }}/>
      <FormField source="phone" input={<Input/>} />
      <FormField source="website" input={<Input/>} />
    </SimpleForm>
  </Create>
);