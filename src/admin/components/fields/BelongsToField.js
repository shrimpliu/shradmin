import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, actions, Link } from 'mirrorx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import { Spin } from 'antd';

class BelongsToField extends Component {

  componentDidMount() {
    this.updateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.record.id, nextProps.record.id)) {
      this.updateData(nextProps);
    }
  }

  updateData = (props) => {
    const { relatedId, related } = props;
    actions[related].getOne(relatedId);
  };

  render() {

    const { children, related, relatedRecord, redirect, allowEmpty, elStyle } = this.props;

    if (isEmpty(relatedRecord) && !allowEmpty) {
      return <Spin/>;
    }

    const content = React.cloneElement(children, {
      record: relatedRecord,
      model: related,
    });

    if (isFunction(redirect)) {
      return <Link style={elStyle} to={redirect(related, relatedRecord)}>{content}</Link>
    }

    return content;

  }

}

BelongsToField.defaultProps = {
  redirect: (related, relatedRecord) => `/${related}/${relatedRecord.id}/show`,
  allowEmpty: false,
};

BelongsToField.propTypes = {
  source: PropTypes.string.isRequired,
  record: PropTypes.object,
  related: PropTypes.string.isRequired,
  redirect: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  allowEmpty: PropTypes.bool,
  children: PropTypes.element.isRequired,
  elStyle: PropTypes.object,
};

export default connect((state, { source, related, record }) => {
  const relatedId = get(record, source);
  const data = state[related].list[relatedId] || {};
  return {
    relatedId,
    relatedRecord: data.record,
  };
})(BelongsToField);