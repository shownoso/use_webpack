const loaderUtils = require('loader-utils');
module.exports = function(content) {
  const options = loaderUtils.getOptions(this);
  console.log(this.query);
  console.log(options.name);
  console.log(content);
  
  // const callback = this.async(); // 指定异步loader回调
  // setTimeout(function() {
  //   const res = content.replace('world', 'webpack');
  //   callback(null, res);
  // }, 3000)

  const res = content.replace('world', 'webpack');
  this.callback(null, res)
}