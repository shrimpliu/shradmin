import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from '../../src';

const sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default (type, params) => {
  switch(type) {
    case AUTH_LOGIN:
      const { username, password } = params;
      return sleep(Math.random() * 3000).then(() => {
        if (username !== "admin" && password !== "admin") {
          throw new Error("Authentication failed");
        }
        localStorage.setItem("username", username);
        return {username};
      });
    case AUTH_LOGOUT:
      localStorage.removeItem('username');
      return Promise.resolve();
    case AUTH_ERROR:
      return Promise.resolve();
    case AUTH_CHECK:
      return localStorage.getItem("username") ? Promise.resolve() : Promise.reject();
    default:
      return Promise.reject('Unknown method');    
  }
}