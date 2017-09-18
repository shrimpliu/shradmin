import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import FiltersFrom from './FiltersForm';

class Filters extends Component {

  setFilters = debounce(filters => {
    if (!isEqual(this.props.values, filters)) {
      this.props.setParams({_filter: filters});
    }
  }, this.props.debounce);

  render() {
    return (
      <FiltersFrom setFilters={this.setFilters} {...this.props}/>
    );
  }
}

Filters.defaultProps = {
  debounce: 500,
};

Filters.propTypes = {
  model: PropTypes.string.isRequired,
  translate: PropTypes.func,
  debounce: PropTypes.number,
  values: PropTypes.object,
};

export default Filters;

