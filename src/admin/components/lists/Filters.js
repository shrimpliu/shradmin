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

    const { elStyle }= this.props;

    return (
      <div style={elStyle}>
        <FiltersFrom setFilters={this.setFilters} {...this.props}/>
      </div>
    );
  }
}

Filters.defaultProps = {
  debounce: 500,
  elStyle: {
    paddingTop: "2em"
  },
};

Filters.propTypes = {
  model: PropTypes.string.isRequired,
  translate: PropTypes.func,
  debounce: PropTypes.number,
  values: PropTypes.object,
  elStyle: PropTypes.object,
};

export default Filters;

