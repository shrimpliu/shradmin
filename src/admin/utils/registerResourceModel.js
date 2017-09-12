import mirror from 'mirrorx';

export default (model) => {
  mirror.model({
    name: model,
    initialState: {
      list: [],
      filter: {},
      sort: {},
      pagination: {
        page: 1,
        perPage: 20,
      },
    },
    reducers: {
      add(state, data) {
        return {
          ...state,
          list: [
            ...state.list,
            data
          ]
        };
      }
    },
  });
};