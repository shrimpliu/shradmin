import request from 'superagent';

import { GET_LIST, GET_ONE } from './types';

const fetch = (url, type, model, params, headers) => {

  switch (type) {
    case GET_LIST:
      const { _page, _limit } = params.pagination || {};
      const { _sort, _order } = params.sort || {};
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
  const { body } = response;
  switch (type) {
    default:
      return {
        data: body
      };
  }
};

export default (url, headers = {}) => {
  return (type, model, params = {}) => {
    return fetch(url, type, model, params, headers).then(response => formatResponse(response, type))
  }
}