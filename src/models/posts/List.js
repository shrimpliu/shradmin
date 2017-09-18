import React from 'react';
import truncate from 'lodash/truncate';
import { List, DataTable, TextField } from '../../admin';
import Filters from './Filters';

export default () => (
  <List model="posts" filters={<Filters />}>
    <DataTable>
      <TextField source="id" />
      <TextField source="userId" sorter={true} />
      <TextField source="title" />
      <TextField source="body" render={value => truncate(value)} />
    </DataTable>
  </List>
)