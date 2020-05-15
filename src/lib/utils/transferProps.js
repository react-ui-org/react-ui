const ALWAYS_BLACKLISTED_PROPS = ['children', 'className', 'forwardedRef'];

export default (props, blacklistedProps) => {
  const propsToTransfer = { ...props };

  [...ALWAYS_BLACKLISTED_PROPS, ...(blacklistedProps || [])].forEach((propName) => {
    delete propsToTransfer[propName];
  });

  return propsToTransfer;
};
