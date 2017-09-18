import React from 'react';
import { List, DataTable, TextField } from '../../admin';
import Filters from './Filters';

export default () => (
  <List model="users" filters={<Filters />}>
    <DataTable>
      <TextField source="id" />
      <TextField source="name" sorter={true} />
      <TextField source="username"/>
      <TextField source="email"/>
      <TextField source="phone"/>
      <TextField source="website"/>
    </DataTable>
  </List>
)