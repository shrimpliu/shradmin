import request from 'superagent';
import isUndefined from 'lodash/isUndefined';

import { GET_LIST, GET_ONE, CREATE, UPDATE, REMOVE } from '../admin';

const fetch = (url, type, model, params, headers) => {

  switch (type) {
    case GET_LIST:
      const { _page, _limit, _sort, _order, _filter } = params;
      const query = {
        page: _page,
        limit: _limit,
        sort: _sort,
        order: _order,
        ..._filter
      };
      return request.get(`${url}/${model}`).set(headers).query(query);
    case GET_ONE:
      return request.get(`${url}/${model}/${params.id}`).set(headers);
    case CREATE:
      return request.post(`${url}/${model}`).set(headers).send(params.data);
    case UPDATE:
      return request.patch(`${url}/${model}/${params.id}`).set(headers).send(params.data);
    case REMOVE:
      return request.delete(`${url}/${model}/${params.id}`).set(headers);
    default:
      throw new Error(`Unsupported fetch type ${type}`);
  }

};

const formatResponse = (response, type) => {
  const { body } = response;
  switch (type) {
    case GET_LIST:
      const { data, meta } = body;
      const total = isUndefined(meta) ? data.length : meta.pagination.total;
      return {
        data: data,
        total: total,
      };
    case GET_ONE:
      return {
        data: body,
      };
    default:
      return {};
  }
};

export default (url, headers = {}) => {
  return (type, model, params = {}) => {
    return fetch(url, type, model, params, headers).then(response => formatResponse(response, type))
  }
}