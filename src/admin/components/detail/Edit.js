import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, actions } from 'mirrorx';
import compose from 'recompose/compose';
import { Card, Spin, message } from 'antd';
import { translate } from '../../i18n';
import Actions from './EditActions';

class Edit extends Component {

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    const { model, id } = this.props;
    actions[model].getOne(id);
  };

  save = async (data) => {
    const { model, id, translate } = this.props;
    await actions[model].getOne(id, data);
    message.success(translate("notification.updated"));
    actions.routing.push(`/${model}/${id}/show`);
  };

  render() {

    const {children, model, title, record, actions, loading, translate} = this.props;

    const titleElement = title || (translate('actions.edit') + translate(`models.${model}.name`));

    return (
      <Card
        title={titleElement}
        bordered={false}
        noHovering={true}
        extra={React.cloneElement(actions, {
          model,
        })} >
        <Spin spinning={loading}>
          {React.cloneElement(children, {
            model,
            record,
            translate,
            save: this.save,
          })}
        </Spin>
      </Card>
    );
  }
}

Edit.defaultProps = {
  actions: <Actions/>,
  redirect: "list",
};

Edit.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.element,
  model: PropTypes.string.isRequired,
  redirect: PropTypes.oneOf(['list', 'edit', 'show']),
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

export default enhance(Edit);