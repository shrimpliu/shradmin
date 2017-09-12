import { actions } from 'mirrorx';
import { message } from 'antd';
import { AUTH_LOGIN } from './types';

export default (authClient) => ({
  name: "auth",
  initialState: {},
  reducers: {
    set(state, data) {
      return {...state, ...data};
    }
  },
  effects: {
    async login({ params, translate }, getState) {
      actions.loading.set(true);
      try {
        const info = await authClient(AUTH_LOGIN, params);
        message.success(translate("auth.login_success"));
        actions.auth.set(info);
        actions.routing.push("/");
      } catch (error) {
        message.error(error.message);
        console.error(error);
      } finally {
        actions.loading.set(false);
      }
    }
  }
});