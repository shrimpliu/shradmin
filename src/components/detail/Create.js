import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, actions } from 'mirrorx';
import compose from 'recompose/compose';
import { Card, Spin } from 'antd';
import { translate } from '../../i18n';
import Actions from './CreateActions';

class Create extends Component {

  save = (data) => {
    const { model, getFieldsValue, redirect } = this.props;
    actions[model].create({data: getFieldsValue(data), redirect});
  };

  render() {

    const { children, model, title, actions, loading, translate, hasList } = this.props;

    const titleElement = title || (translate('actions.create') + translate(`models.${model}.name`));

    return (
      <Card
        title={titleElement}
        bordered={false}
        noHovering={true}
        extra={React.cloneElement(actions, {
          model,
          hasList,
        })} >
        <Spin spinning={loading}>
          {React.cloneElement(children, {
            model,
            translate,
            save: this.save,
          })}
        </Spin>
      </Card>
    );

  }
}

Create.defaultProps = {
  actions: <Actions/>,
  redirect: "list",
  getFieldsValue: values => values,
};

Create.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.element,
  model: PropTypes.string.isRequired,
  redirect: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.oneOf(['list', 'edit', 'show'])]),
  getFieldsValue: PropTypes.func,
};

const enhance = compose(
  connect(({loading}) => ({
    loading,
  })),
  translate,
);

export default enhance(Create);