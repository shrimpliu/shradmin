import { actions } from 'mirrorx';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from './types';

export default (authClient) => ({
  name: "auth",
  initialState: {},
  reducers: {
    set(state, data) {
      return {...state, ...data};
    }
  },
  effects: {
    async login(params) {
      actions.loading.set(true);
      try {
        const login = await authClient(AUTH_LOGIN, params);
        actions.notification.success("auth.login_success");
        actions.auth.set(login);
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
      actions.auth.set({});
      actions.routing.push("/login");
    },
    async check() {
      try {
        const login = await authClient(AUTH_CHECK);
        if (login) {
          actions.auth.set(login);
        }
      } catch (error) {
        actions.auth.logout();
      }
    },
  }
});