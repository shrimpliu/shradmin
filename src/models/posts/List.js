import React from 'react';
import truncate from 'lodash/truncate';
import { List, DataTable, TextField } from '../../admin';

export default () => (
  <List model="posts">
    <DataTable>
      <TextField name="id" />
      <TextField name="userId" sorter={true} />
      <TextField name="title" />
      <TextField name="body" render={value => truncate(value)} />
    </DataTable>
  </List>
)