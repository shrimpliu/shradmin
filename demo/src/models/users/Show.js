import React from 'react';
import { Show, SimpleShowLayout, TextField } from '../../../../lib';

const Title = ({ record }) => <span>{record.name}</span>;

export default (props) => (
  <Show title={<Title/>} model="users" {...props}>
    <SimpleShowLayout>
      <TextField source="name"/>
      <TextField source="username"/>
      <TextField source="email"/>
      <TextField source="phone"/>
      <TextField source="website"/>
    </SimpleShowLayout>
  </Show>
);