import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, actions } from 'mirrorx';
import compose from 'recompose/compose';
import { Card, Spin } from 'antd';
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

  save = (data) => {
    const { model, id, getFieldsValue, redirect } = this.props;
    actions[model].update({ id, data: getFieldsValue(data, id), redirect });
  };

  render() {

    const { children, model, title, record, actions, loading, translate, hasShow, hasList } = this.props;

    const titleElement = title || (translate('actions.edit') + translate(`models.${model}.name`));

    return (
      <Card
        title={titleElement}
        bordered={false}
        noHovering={true}
        extra={React.cloneElement(actions, {
          model,
          record,
          hasShow,
          hasList,
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
  getFieldsValue: (values, id) => values,
};

Edit.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.element,
  model: PropTypes.string.isRequired,
  redirect: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.oneOf(['list', 'edit', 'show'])]),
  getFieldsValue: PropTypes.func,
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