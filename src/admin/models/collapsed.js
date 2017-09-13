export default {
  name: "collapsed",
  initialState: false,
  reducers: {
    toggle(state) {
      return !state;
    }
  }
}