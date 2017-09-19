import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from 'antd';
import { actions } from 'mirrorx';
import { translate } from '../../i18n';

const ShowButton = ({ translate, model, record, simple }) => {

  const buttonProps = {
    icon: "eye",
    type: "primary",
    ghost: true,
    onClick: () => actions.routing.push(`/${model}/${record.id}/show`)
  };

  return (
    simple ?
      <Popover content={translate("actions.show")}>
        <Button {...buttonProps}/>
      </Popover> :
      <Button {...buttonProps}>
        {translate("actions.show")}
      </Button>
  );
};

ShowButton.defaultProps = {
  simple: false,
  record: {},
};

ShowButton.propTypes = {
  model: PropTypes.string.isRequired,
  record: PropTypes.object,
  translate: PropTypes.func.isRequired,
  simple: PropTypes.bool,
};

export default translate(ShowButton);