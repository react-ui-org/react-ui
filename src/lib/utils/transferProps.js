const ALWAYS_BLACKLISTED_PROPS = ['children', 'className', 'forwardedRef', 'staticContext'];

export default (props) => {
  const propsToTransfer = { ...props };

  ALWAYS_BLACKLISTED_PROPS.forEach((propName) => {
    delete propsToTransfer[propName];
  });

  return propsToTransfer;
};
