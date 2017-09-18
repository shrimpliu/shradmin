import React, { Component } from 'react';
import './App.css';
import { Admin, Model } from './admin';
import { UserList, UserIcon, UserShow, PostList, PostIcon, PostShow } from './models';
import authClient from './authClient';
import restClient from './restClient';
import messages from './i18n';

class App extends Component {
  render() {
    return (
      <Admin authClient={authClient} restClient={restClient} language="zh" messages={messages}>
        <Model name="users" list={UserList} show={UserShow} icon={UserIcon}/>
        <Model name="posts" list={PostList} show={PostShow} icon={PostIcon}/>
      </Admin>
    );
  }
}

export default App;
