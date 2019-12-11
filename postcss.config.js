// preset-env: 通过.browserslistrc读取浏览器进行polyfill
module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0 // polyfill版本 默认为2  http://preset-env.cssdb.org/features
    },
  }
};


// module.exports = ({ file, options, env }) => ({
//   plugins: {
//     'cssnano': env === 'production' ? options.cssnano : false
//   }
// });