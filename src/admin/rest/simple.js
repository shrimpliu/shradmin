import request from 'superagent';

import { GET_LIST, GET_ONE } from './types';

const fetch = (url, type, model, params, headers) => {

  switch (type) {
    case GET_LIST:
      const { _page, _limit, _sort, _order } = params;
      const query = {
        _page,
        _limit,
        _sort,
        _order,
        ...params.filter
      };
      return request.get(`${url}/${model}`).set(headers).query(query);
    case GET_ONE:
      return request.get(`${url}/${model}/${params.id}`).set(headers);
    default:
      throw new Error(`Unsupported fetch type ${type}`);
  }

};

const formatResponse = (response, type) => {
  const { body, headers } = response;
  switch (type) {
    default:
      return {
        data: body,
        total: parseInt(headers['x-total-count'].split('/').pop(), 10),
      };
  }
};

export default (url, headers = {}) => {
  return (type, model, params = {}) => {
    return fetch(url, type, model, params, headers).then(response => formatResponse(response, type))
  }
}