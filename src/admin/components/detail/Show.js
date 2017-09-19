import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, actions } from 'mirrorx';
import compose from 'recompose/compose';
import { Card, Spin } from 'antd';
import { translate } from '../../i18n';
import Actions from './ShowActions';

class Show extends Component {

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    const { model, id } = this.props;
    actions[model].getOne(id);
  };

  refresh = (event) => {
    event.stopPropagation();
    this.updateData();
  };

  render() {
    const { children, title, model, record, id, actions, loading, translate } = this.props;

    const titleElement = (record && title) ? React.cloneElement(title, { record }) : (translate(`models.${model}.name`) + ` #${id}`);

    return (
      <Card
        title={titleElement}
        bordered={false}
        noHovering={true}
        extra={React.cloneElement(actions, {
          model,
          refresh: this.refresh,
        })} >
        <Spin spinning={loading}>
          {record && React.cloneElement(children, {
            model,
            record,
            translate,
          })}
        </Spin>
      </Card>
    );

  }

}

Show.propTypes = {
  actions: PropTypes.element,
  model: PropTypes.string.isRequired,
};

Show.defaultProps = {
  actions: <Actions/>
};

const enhance = compose(
  connect((state, props) => {
    const id = decodeURIComponent(props.match.params.id);
    const data = state[props.model].list[id] || {};
    return {
      id,
      record: data.record,
      loading: state.loading,
    };
  }),
  translate,
);

export default enhance(Show);