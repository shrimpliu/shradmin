import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions, connect } from 'mirrorx';
import compose from 'recompose/compose';
import { translate } from '../../i18n';
import { Page } from '../common';
import Actions from './Actions';

class List extends Component {

  componentDidMount() {
    const { model, filter, pagination, sort } = this.props;
    actions[model].getList({filter, pagination, sort});
  }

  updateData() {
    const { model, filter, pagination, sort } = this.props;
    actions[model].getList({filter, pagination, sort});
  }

  refresh = (event) => {
    event.stopPropagation();
    this.updateData();
  };

  render() {

    const { actions, model, children, data } = this.props;

    return (
      <Page>
        {actions && React.cloneElement(actions, {
          model,
          refresh: this.refresh,
        })}
        {children && React.cloneElement(children, {
          data,
          model,
        })}
      </Page>
    );
  }
}

List.propTypes = {
  actions: PropTypes.element,
};

List.defaultProps = {
  actions: <Actions/>
};

const enhance = compose(
  connect((state, props) => {
    const model = props.model;
    const { filter, pagination, sort, list } = state[model];
    return {
      filter,
      pagination,
      sort,
      data: list
    };
  }),
  translate,
);

export default enhance(List);