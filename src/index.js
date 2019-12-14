import './index.css';

const dynamicImport = async () => {
  console.log('async importing');
  import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
   console.log(_.join(['async', 'imported'], '**'))
  }).catch(error => console.log('async import error'));
};

document.addEventListener('click', () => {
  // dynamicImport();
  import(/* webpackPrefetch: true */ './prefetch-module').then(({ default: fn }) => {
    fn();
  });
})