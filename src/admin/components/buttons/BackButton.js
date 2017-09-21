import React from 'react';
import { Button } from 'antd';
import { actions } from 'mirrorx';
import { translate } from '../../i18n';

const BackButton = ({ translate }) => (
  <Button icon="arrow-left" onClick={() => actions.routing.goBack()}>{translate('actions.back')}</Button>
);

export default translate(BackButton);