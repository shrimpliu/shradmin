import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from 'antd';
import { actions } from 'mirrorx';
import { translate } from '../../i18n';

const EditButton = ({ translate, model, record, simple }) => {

  const buttonProps = {
    icon: "edit",
    type: "primary",
    ghost: true,
    onClick: () => actions.routing.push(`/${model}/${record.id}`)
  };

  return (
    simple ?
      <Popover content={translate("actions.edit")}>
        <Button {...buttonProps}/>
      </Popover> :
      <Button {...buttonProps}>
        {translate("actions.edit")}
      </Button>
  );
};

EditButton.defaultProps = {
  simple: false,
  record: {},
};

EditButton.propTypes = {
  model: PropTypes.string.isRequired,
  record: PropTypes.object,
  translate: PropTypes.func.isRequired,
  simple: PropTypes.bool,
};

export default translate(EditButton);