import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { actions } from 'mirrorx';
import { translate } from '../../i18n';

const ListButton = ({ translate, model }) => (
  <Button type="primary" icon="bars" onClick={() => actions.routing.push(`/${model}`)}>
    {translate("actions.list")}
  </Button>
);

ListButton.propTypes = {
  model: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};

export default translate(ListButton);