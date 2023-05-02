import React from 'react';
import pkg from '../../../../package.json';

export const Version = () => (
  <>
    Currently
    {' '}
    <strong>
      v
      {pkg.version}
    </strong>
  </>
);

export default Version;
