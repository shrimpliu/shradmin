import React from 'react';
import truncate from 'lodash/truncate';
import { Link } from 'mirrorx';
import { List, DataTable, TextField, BelongsToField } from '../../../../src';
import Filters from './Filters';

export default (props) => (
  <List model="posts" filters={<Filters />} {...props}>
    <DataTable>
      <TextField source="id" />
      <BelongsToField source="userId" related="users">
        <TextField source="name"/>
      </BelongsToField>
      <TextField source="title" format={(value, record) => <Link to={`/posts/${record.id}/show`}>{value}</Link>} />
      <TextField source="body" format={value => truncate(value)} />
    </DataTable>
  </List>
)