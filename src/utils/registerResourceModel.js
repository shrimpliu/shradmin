import mirror, { actions } from 'mirrorx';
import isString from 'lodash/isString';
import pull from 'lodash/pull';
import isFunction from 'lodash/isFunction';
import { GET_LIST, GET_ONE, CREATE, UPDATE, REMOVE } from '../rest';

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

const handleFetchError = (error) => {
  console.error(error);
  const errorMessage = isString(error) ? error : (error.message || "notification.fetch_error");
  actions.notification.error(errorMessage);
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
      pull(state, id) {
        pull(state.ids, id);
        return state;
      },
    },
    effects: {
      async getList(params) {
        actions.loading.set(true);
        try {
          const result = await restClient(GET_LIST, model, params);
          actions[model].add(result);
        } catch (error) {
          handleFetchError(error);
        } finally {
          actions.loading.set(false);
        }
      },
      async getOne(id) {
        actions.loading.set(true);
        try {
          const {data} = await restClient(GET_ONE, model, {id});
          actions[model].addOne(data);
        }  catch (error) {
          handleFetchError(error);
        } finally {
          actions.loading.set(false);
        }
      },
      async create({data, redirect = "list"}) {
        actions.loading.set(true);
        try {
          const result = await restClient(CREATE, model, { data });
          actions.notification.success("notification.created");
          const record = result.data;
          let location = `/${model}`;
          if (record) {
            actions[model].addOne(record);
            if (isFunction(redirect)) {
              location = redirect(model, record);
            } else if (redirect === "show" && record.id) {
              location = `/${model}/${record.id}/show`
            } else if (redirect === "edit" && record.id) {
              location = `/${model}/${record.id}`
            }
          }
          if (redirect) {
            actions.routing.push(location);
          }
        } catch (error) {
          handleFetchError(error);
        } finally {
          actions.loading.set(false);
        }
      },
      async update({ id, data, redirect = "list" }) {
        actions.loading.set(true);
        try {
          const result = await restClient(UPDATE, model, { id, data });
          actions.notification.success("notification.updated");
          const record = result.data;
          let location = `/${model}`;
          if (record) {
            actions[model].addOne(record);
            if (isFunction(redirect)) {
              location = redirect(model, record);
            } else if (redirect === "show" && record.id) {
              location = `/${model}/${record.id}/show`
            } else if (redirect === "edit" && record.id) {
              location = `/${model}/${record.id}`
            }
          }
          if (redirect) {
            actions.routing.push(location);
          }
        } catch (error) {
          handleFetchError(error);
        } finally {
          actions.loading.set(false);
        }
      },
      async remove({id, redirect = "list"}) {
        actions.loading.set(true);
        try {
          await restClient(REMOVE, model, { id });
          actions[model].pull(id);
          actions.notification.success('notification.deleted');
          if (redirect) {
            actions.routing.push(`/${model}`);
          }
        } catch (error) {
          handleFetchError(error);
        } finally {
          actions.loading.set(false);
        }
      },
    }

  });
};