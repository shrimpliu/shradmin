import React from 'react';
import { Show, SimpleShowLayout, TextField } from '../../../../lib';

const Title = ({ record }) => <span>{record.title}</span>;

export default (props) => (
  <Show title={<Title/>} model="posts" {...props}>
    <SimpleShowLayout>
      <TextField source="title"/>
      <TextField source="body"/>
    </SimpleShowLayout>
  </Show>
);