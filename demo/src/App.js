import React, { Component } from 'react';
import './App.css';
import { Admin, Model } from '../../src';
import {
  UserList, UserIcon, UserShow, UserCreate, UserEdit,
  PostList, PostIcon, PostShow,
} from './models';
import authClient from './authClient';
import restClient from './restClient';
import messages from './i18n';
import customRoutes from './customRoutes';


class App extends Component {
  render() {
    return (
      <Admin authClient={authClient} restClient={restClient} customRoutes={customRoutes} language="zh" messages={messages}>
        <Model name="users" list={UserList} show={UserShow} create={UserCreate} edit={UserEdit} hasDelete icon={UserIcon}/>
        <Model name="posts" list={PostList} show={PostShow} icon={PostIcon}/>
      </Admin>
    );
  }
}

export default App;
