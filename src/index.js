// import './index.css';
// import _ from 'lodash';
// import './ts-module'
// console.log(_.join(['hello', 'webpack'], '**'));


console.log('hello world');





// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

// import {join} from 'lodash-es';
// import {say} from './test-shim-module';
// say()

// console.log(join(['lodash', 'es'], '-'))

// import another from './another-module';
// console.log('index...');
// another();

// const dynamicImport = () => async () => {
//   console.log('async importing');
//   import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
//    console.log(_.join(['async', 'imported'], '**'))
//   }).catch(error => console.log('async import error'));
// };

// document.addEventListener('click', () => {
//   dynamicImport();
//   import(/* webpackPrefetch: true *//* webpackChunkName: "prefetch-module" */ './prefetch-module').then(({ default: fn }) => {
//     fn();
//   });
// })