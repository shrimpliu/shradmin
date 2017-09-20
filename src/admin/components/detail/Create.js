import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, actions } from 'mirrorx';
import compose from 'recompose/compose';
import { Card, Spin, message } from 'antd';
import { translate } from '../../i18n';
import Actions from './CreateActions';

class Create extends Component {

  save = async (data) => {
    const { model, translate } = this.props;
    await actions[model].create(data);
    message.success(translate("notification.created"));
    actions.routing.push(`/${model}`);
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
};

Create.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.element,
  model: PropTypes.string.isRequired,
  redirect: PropTypes.oneOf(['list', 'edit', 'show']),
};

const enhance = compose(
  connect(({loading}) => ({
    loading,
  })),
  translate,
);

export default enhance(Create);