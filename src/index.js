import './index.css';
// import {join} from 'lodash-es';
// import {say} from './test-shim-module';
// say()

// console.log(join(['lodash', 'es'], '-'))

import another from './another-module';
console.log('index...');
another();

// const dynamicImport = () => async () => {
//   console.log('async importing');
//   import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
//    console.log(_.join(['async', 'imported'], '**'))
//   }).catch(error => console.log('async import error'));
// };



document.addEventListener('click', () => {
  // dynamicImport();
  // import(/* webpackPrefetch: true *//* webpackChunkName: "prefetch-module" */ './prefetch-module').then(({ default: fn }) => {
  //   fn();
  // });
})