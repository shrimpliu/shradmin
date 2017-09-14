import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { translate } from '../../i18n';

const RefreshButton = ({ translate, refresh }) => (
  <Button icon="sync" onClick={refresh}>
    {translate("actions.refresh")}
  </Button>
);

RefreshButton.propTypes = {
  refresh: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};

export default translate(RefreshButton);