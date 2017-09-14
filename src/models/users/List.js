import React from 'react';
import { List, DataTable, TextField } from '../../admin';

export default () => (
  <List model="users">
    <DataTable>
      <TextField name="id"/>
      <TextField name="name"/>
      <TextField name="username"/>
      <TextField name="email"/>
      <TextField name="phone"/>
      <TextField name="website"/>
    </DataTable>
  </List>
)