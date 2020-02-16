const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

/** 
 *  模块分析
 *  通过 @babel/parser 将源代码处理为AST
 *  使用 @babel/traverse 遍历AST并找到AST中包含引入声明（ImportDeclaration）的节点
 *  组织依赖的映射关系
 *  使用 @babel/core 将 AST 转回 代码
 * */  
const moduleAnalyser = (filename) => {
	const content = fs.readFileSync(filename, 'utf-8');
	const ast = parser.parse(content, {
		sourceType: 'module'
	});
	const dependencies = {};
	traverse(ast, {
		ImportDeclaration({ node }) {
      // 全部转换(相对于_bundle.js所在，根路径)绝对路径
			const dirname = path.dirname(filename);
      const newFile = './' + path.join(dirname, node.source.value);
      // 组织引入的文件的相对路径到绝对路径的映射关系
			dependencies[node.source.value] = newFile;
		}
	});
	const { code } = babel.transformFromAst(ast, null, {
		presets: ["@babel/preset-env"]
	});
	return {
		filename,
		dependencies,
		code
	}
}

/**
 * 建立依赖图
 * 
 */
const makeDependenciesGraph = (entry) => {
	const entryModule = moduleAnalyser(entry);
	const graphArray = [ entryModule ];
	for(let i = 0; i < graphArray.length; i++) {
		const item = graphArray[i];
    const { dependencies } = item;
    // 若该文件内存在依赖，则继续处理该文件
		if(dependencies) {
			for(let j in dependencies) {
        // 将依赖项添加到队尾，以逐层进行依赖分析
				graphArray.push(
					moduleAnalyser(dependencies[j])
				);
			}
		}
	}
	const graph = {};
	graphArray.forEach(item => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code
		}
  });
  console.log(graph)
	return graph;
}

/**
 *  代码生成。 绝对路径： 相对_bundler.js
 *  目标： 根据依赖图找到文件对应的代码并执行
 *  构建代码中需要的require（localRequire） 和 exports对象（{}）
 *  localRequire拿到的是相对路径，在当前模块中通过映射关系找到对应的绝对路径（module.dependencies）
 *  （比如 在模块index.js中找到 './message.js' 的绝对路径'./src/message.js'，然后调用顶层require获取message模块）
 *  return exports; 实现模块导出（暴露）
 */ 

const generateCode = (entry) => {
  // 通过字符串传递依赖图
	const graph = JSON.stringify(makeDependenciesGraph(entry));
	return `
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
}

const code = generateCode('./src/index.js');
console.log(code);

