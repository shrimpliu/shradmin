import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';

class RichTextInput extends Component {

  handleHtmlContent = (htmlContent) => {
    const { onChange } = this.props;
    onChange(htmlContent);
  };

  render() {
    const props = this.props;
    return (
      <LzEditor
        cbReceiver={this.handleHtmlContent}
        video={false}
        audio={false}
        {...props}/>
    );
  }
}

export default RichTextInput;