module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false
  },
  babel: {
    "plugins": [
      ["import", {libraryName: 'antd', style: true}]
    ]
  }

};