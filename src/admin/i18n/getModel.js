import { DEFAULT_LOCALE } from '../i18n';

export default (initialState = DEFAULT_LOCALE) => ({
  name: "locale",
  initialState: initialState,
  reducers: {
    set(state, data) {
      return data;
    }
  }
});