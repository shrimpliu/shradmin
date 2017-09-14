import mirror, { actions } from 'mirrorx';
import { GET_LIST } from '../rest'

export default (model, restClient) => {
  mirror.model({
    name: model,
    initialState: {
      list: [],
      filter: {},
      sort: {
        _sort: null,
        _order: "asc",
      },
      pagination: {
        _page: 1,
        _limit: 20,
      },
    },
    reducers: {
      add(state, data) {
        return {
          ...state,
          list: [
            ...state.list,
            ...data
          ]
        };
      }
    },
    effects: {
      async getList(params) {
        actions.loading.set(true);
        const { data } = await restClient(GET_LIST, model, params);
        actions[model].add(data);
        actions.loading.set(false);
      },
    }

  });
};