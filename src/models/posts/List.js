import React from 'react';
import truncate from 'lodash/truncate';
import { Link } from 'mirrorx';
import { List, DataTable, TextField } from '../../admin';
import Filters from './Filters';

export default (props) => (
  <List model="posts" filters={<Filters />} {...props}>
    <DataTable>
      <TextField source="id" />
      <TextField source="userId" sorter={true} />
      <TextField source="title" render={(value, record) => <Link to={`/posts/${record.id}/show`}>{value}</Link>} />
      <TextField source="body" render={value => truncate(value)} />
    </DataTable>
  </List>
)