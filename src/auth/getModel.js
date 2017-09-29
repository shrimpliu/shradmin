import { actions } from 'mirrorx';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_USER } from './types';
import { GET_USER } from '../rest/types';

export default (authClient, restClient) => ({
  name: "auth",
  initialState: {
    login: {},
    info: {},
  },
  reducers: {
    setLogin(state, data) {
      return {...state, login: data};
    },
    setInfo(state, data) {
      return {...state, info: data};
    },
    clear(state) {
      return {
        login: {},
        info: {},
      };
    }
  },
  effects: {
    async login(params) {
      actions.loading.set(true);
      try {
        const login = await authClient(AUTH_LOGIN, params);
        actions.notification.success("auth.login_success");
        actions.auth.setLogin(login);
        actions.auth.getUserInfo();
        actions.routing.push("/");
      } catch (error) {
        actions.notification.error(error.message);
        console.error(error);
      } finally {
        actions.loading.set(false);
      }
    },
    async logout() {
      await authClient(AUTH_LOGOUT);
      actions.auth.clear();
      actions.routing.push("/login");
    },
    async check() {
      try {
        const { login, info } = await authClient(AUTH_CHECK);
        if (login) {
          actions.auth.setLogin(login);
        }
        if (info) {
          actions.auth.setInfo(info);
        }
      } catch (error) {
        actions.auth.logout();
      }
    },
    async getUserInfo(params) {
      try {
        const info = await authClient(AUTH_USER, params);
        if (info) {
          actions.auth.setInfo(info);
        }
      } catch (error) {
        console.error(error);
        actions.auth.logout();
      }
    },
  }
});