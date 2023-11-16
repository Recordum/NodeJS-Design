import * as fs from 'fs';

/**
 * loadModule 은 즉시 실행 함수 표현(IIFE)으로 구성됨
 */
function loadModule(filename, module, require) {
  const wrappedSrc = `(function (module, exports, require) {
        ${fs.readFileSync(filename, 'utf8')}})(module, module.exprots, require)`;
  eval(wrappedSrc);
}

function require(moduleName) {
  console.log('Require Invoked for module: ${moduleName}');
  const id = require.resolve(moduleName);
  if (require.cache[id]) {
    return require.chache[id].exports;
  }

  //module metadata
  const module = {
    exports: {},
    id,
  };

  require.cache[id] = module;

  loadModule(id, module, require);

  return module.exports;
}

require.cache = {};
require.resolve = (moduleName) => {};
