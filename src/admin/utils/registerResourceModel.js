import mirror, { actions } from 'mirrorx';
import { GET_LIST, GET_ONE } from '../rest';

const addRecords = (newRecords = [], oldRecords) => {

  const newRecordsById = newRecords.reduce((prev, record) => {
    prev[record.id] = {
      record,
      fetchedAt: new Date(),
    };
    return prev;
  }, {});

  return {
    ...oldRecords,
    ...newRecordsById,
  };
};

export default (model, restClient) => {
  mirror.model({
    name: model,
    initialState: {
      list: {},
      ids: [],
      total: 0,
      params: {
        _filter: {},
        _sort: null,
        _order: "asc",
        _page: 1,
        _limit: 10,
      },
    },
    reducers: {
      add(state, { data, total }) {
        return {
          ...state,
          list: addRecords(data, state.list),
          total,
          ids: data.map(record => record.id),
        };
      },
      addOne(state, data) {
        return {
          ...state,
          list: addRecords([data], state.list),
        }
      },
      setListParams(state, data) {
        return {
          ...state,
          params: {
            ...state.params,
            ...data
          },
        }
      },
    },
    effects: {
      async getList(params) {
        actions.loading.set(true);
        const result = await restClient(GET_LIST, model, params);
        actions[model].add(result);
        actions.loading.set(false);
      },
      async getOne(id) {
        actions.loading.set(true);
        const { data } = await restClient(GET_ONE, model, { id });
        actions[model].addOne(data);
        actions.loading.set(false);
      },
    }

  });
};