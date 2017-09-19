import request from 'superagent';

import { GET_LIST, GET_ONE, CREATE } from './types';

const fetch = (url, type, model, params, headers) => {

  switch (type) {
    case GET_LIST:
      const { _page, _limit, _sort, _order, _filter } = params;
      const query = {
        _page,
        _limit,
        _sort,
        _order,
        ..._filter
      };
      return request.get(`${url}/${model}`).set(headers).query(query);
    case GET_ONE:
      return request.get(`${url}/${model}/${params.id}`).set(headers);
    case CREATE:
      return request.post(`${url}/${model}`).set(headers).send(params.data);
    default:
      throw new Error(`Unsupported fetch type ${type}`);
  }

};

const formatResponse = (response, type) => {
  const { body, headers } = response;
  switch (type) {
    case GET_LIST:
      return {
        data: body,
        total: parseInt(headers['x-total-count'].split('/').pop(), 10),
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