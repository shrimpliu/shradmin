import React, { Component } from 'react';
import { Modal } from 'antd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

class PictureField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      src: '',
    };
  }

  handleOpen = (e) => {
    const node = e.target;
    const src = node.getAttribute('src');
    this.setState({ open: true, src: src});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { record, source, children, format } = this.props;
    const { open, src } = this.state;
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',
    };
    let images = format(get(record,source), record);
    if(!isArray(images)){
      images = [images];
    }
    return (
      <div>
        <ul style={style}>
          {
            images.map((image, index) => (
              <li key={index}>
                <img src={image} onClick={this.handleOpen} alt=""/>
              </li>
            ))
          }
        </ul>
        <Modal visible={open} closable={false} footer={null} onCancel={this.handleClose}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <img src={src} alt="" style={{ width: '60%', height: '60%' }}/>
            {
              React.Children.map(children, (child, index) => (
                <p style={{ textAlign: 'center' }} key={index}>
                  {
                    React.cloneElement(child)
                  }
                </p>
              ))
            }
          </div>
        </Modal>
      </div>
    );
  }
}

PictureField.PropTypes = {
  format: PropTypes.func,
};

PictureField.defaultProps = {
  format: (value, record) => value,
};

export default PictureField;