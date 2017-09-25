import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { actions } from 'mirrorx';
import { translate } from '../../i18n';

const RemoveButton = ({ translate, model, record, simple }) => {

  const confirm = () => {
    actions[model].remove(record.id);
  };

  const buttonProps = {
    icon: "delete",
    type: "danger",
    ghost: true,
  };

  return (
    <Popconfirm title={translate("tips.delete_warning")} onConfirm={confirm}>
      <Button {...buttonProps}>{ simple ? null : translate("actions.remove")}</Button>
    </Popconfirm>
  );
};

RemoveButton.defaultProps = {
  simple: false,
  record: {},
};

RemoveButton.propTypes = {
  model: PropTypes.string.isRequired,
  record: PropTypes.object,
  translate: PropTypes.func.isRequired,
  simple: PropTypes.bool,
};

export default translate(RemoveButton);