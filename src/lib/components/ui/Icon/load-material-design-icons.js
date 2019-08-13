export default () => {
  const importAll = (r) => {
    r.keys().forEach((key) => { r(key); });
  };

  importAll(require.context('!svg-sprite-loader!material-design-icons/', true, /[\\/]svg[\\/]production[\\/]ic_.*_48px\.svg$/));
};
