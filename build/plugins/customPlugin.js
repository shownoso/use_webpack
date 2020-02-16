class CustomPlugin {
  constructor(options) {

  }

  apply(compiler) {

    // 同步示例 compile阶段
    compiler.hooks.compile.tap('CustomPlugin', compilation => {
      
    });
    //异步示例 emit阶段
    compiler.hooks.emit.tapAsync('CustomPlugin',(compilation, cb) => {
      // debugger
      compilation.assets['custom.txt'] = {
        source: function() {
          return 'hello webpack'
        },
        size: function() {
          return 13;
        }
      }
      cb();
    });
  }
}
module.exports = CustomPlugin;