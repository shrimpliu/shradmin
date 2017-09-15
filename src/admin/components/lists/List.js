import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions, connect } from 'mirrorx';
import compose from 'recompose/compose';
import { parse, stringify } from 'querystring';
import startsWith from 'lodash/startsWith';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import { translate } from '../../i18n';
import { Page } from '../common';
import Actions from './Actions';

class List extends Component {

  componentDidMount() {
    const { model, query } = this.props;
    actions[model].setListParams(query);
    const requestParams = this.getRequestParams();
    this.updateData(requestParams);
  }

  componentWillReceiveProps(nextProps) {
    const { model, query, params } = nextProps;
    if (model !== this.props.model || !isEqual(query, this.props.query)) {
      actions[model].setListParams(query);
      this.updateData({ ...params, ...query });
    }
  }

  getRequestParams() {
    const { query, params } = this.props;
    return { ...params, ...query };
  }

  updateData(requestParams) {
    const { model } = this.props;
    actions[model].getList(requestParams);
  }

  setParams(newParams) {
    const { query, params, location } = this.props;
    const requestParams = { ...params, ...query, ...newParams };
    actions.routing.push({ ...location, search: `?${stringify(requestParams)}` });
  }

  refresh = (event) => {
    event.stopPropagation();
    const requestParams = this.getRequestParams();
    this.updateData(requestParams);
  };

  render() {

    const { actions, model, children, data, translate, params, total } = this.props;

    return (
      <Page>
        {actions && React.cloneElement(actions, {
          model,
          refresh: this.refresh,
        })}
        {children && React.cloneElement(children, {
          data,
          model,
          translate,
          params,
          total,
          changePage: (_page) => this.setParams({ _page })
        })}
      </Page>
    );
  }
}

List.propTypes = {
  actions: PropTypes.element,
  model: PropTypes.string,
  data: PropTypes.array,
  translate: PropTypes.func,
  params: PropTypes.object,
  total: PropTypes.number,
};

List.defaultProps = {
  actions: <Actions/>,
  data: [],
  params: {},
  total: 0,
};

const getQuery = (search) => {
  const query = parse(startsWith(search, '?') ? search.substr(1) : search);
  if (query.filter && isString(query.filter)) {
    query.filter = JSON.parse(query.filter);
  }
  return query;
};

const enhance = compose(
  connect((state, props) => {
    const model = props.model;
    const { params, list, ids, total } = state[model];
    return {
      params,
      data: ids.map(id => list[id].record),
      total,
      query: getQuery(state.routing.location.search),
      location: state.routing.location,
    };
  }),
  translate,
);

export default enhance(List);