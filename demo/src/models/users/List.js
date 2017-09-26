import React from 'react';
import { Link } from 'mirrorx';
import { List, DataTable, TextField, EditButton, ShowButton, RemoveButton } from '../../../../src';
import Filters from './Filters';

export default (props) => (
  <List model="users" filters={<Filters />} {...props}>
    <DataTable>
      <TextField source="id" />
      <TextField source="name" format={(value, record) => <Link to={`/users/${record.id}/show`}>{value}</Link>} sorter={true} />
      <TextField source="username"/>
      <TextField source="email"/>
      <TextField source="phone"/>
      <TextField source="website"/>
      <ShowButton simple />
      <EditButton simple />
      <RemoveButton simple/>
    </DataTable>
  </List>
)