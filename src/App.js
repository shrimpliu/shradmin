import React, { Component } from 'react';
import './App.css';
import { Admin, Model } from './admin';
import {
  UserList, UserIcon, UserShow, UserCreate,
  PostList, PostIcon, PostShow,
} from './models';
import authClient from './authClient';
import restClient from './rest';
import messages from './i18n';


class App extends Component {
  render() {
    return (
      <Admin authClient={authClient} title={process.env.REACT_APP_NAME} restClient={restClient} language="zh" messages={messages}>
        <Model name="users" list={UserList} show={UserShow} create={UserCreate} icon={UserIcon}/>
        <Model name="posts" list={PostList} show={PostShow} icon={PostIcon}/>
      </Admin>
    );
  }
}

export default App;
