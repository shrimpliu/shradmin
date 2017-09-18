import React from 'react';
import { Link } from 'mirrorx';
import { List, DataTable, TextField } from '../../admin';
import Filters from './Filters';

export default () => (
  <List model="users" filters={<Filters />}>
    <DataTable>
      <TextField source="id" />
      <TextField source="name" render={(value, record) => <Link to={`/users/${record.id}/show`}>{value}</Link>} sorter={true} />
      <TextField source="username"/>
      <TextField source="email"/>
      <TextField source="phone"/>
      <TextField source="website"/>
    </DataTable>
  </List>
)