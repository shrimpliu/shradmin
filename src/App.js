import React, { Component } from 'react';
import './App.css';
import { Admin, Model } from './admin';
import { UserList, UserIcon, PostList, PostIcon } from './models';
import authClient from './authClient';
import restClient from './restClient';
import messages from './i18n';

class App extends Component {
  render() {
    return (
      <Admin authClient={authClient} restClient={restClient} language="zh" messages={messages}>
        <Model name="users" list={UserList} icon={UserIcon}/>
        <Model name="posts" list={PostList} icon={PostIcon}/>
      </Admin>
    );
  }
}

export default App;
