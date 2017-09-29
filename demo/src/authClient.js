import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR, AUTH_USER } from '../../src';

const sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default (type, params) => {

  const login = JSON.parse(localStorage.getItem('login'));
  const info = JSON.parse(localStorage.getItem('info'));

  switch(type) {
    case AUTH_LOGIN:
      const { username, password } = params;
      return sleep(Math.random() * 3000).then(() => {
        if (username !== "admin" && password !== "admin") {
          throw new Error("Authentication failed");
        }
        localStorage.setItem("login", JSON.stringify({ username }));
        return { username };
      });
    case AUTH_LOGOUT:
      localStorage.removeItem('login');
      localStorage.removeItem('info');
      return Promise.resolve();
    case AUTH_ERROR:
      return Promise.resolve();
    case AUTH_CHECK:
      if (login.username) {
        return Promise.resolve({login, info });
      }
      return Promise.reject();
    case AUTH_USER:
      localStorage.setItem("info", JSON.stringify({ username: login.username, name: login.username }));
      return { username: login.username, name: login.username };
    default:
      return Promise.reject('Unknown method');    
  }
}