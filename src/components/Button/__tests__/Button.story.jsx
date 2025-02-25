import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
} from 'react';
import { Button } from '..';

export const ButtonForTest = ({
  ...props
}) => (
  <Button
    label="Button"
    {...props}
  />
);

export const ButtonForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
}) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <Button
      {...props}
      label="Button"
      ref={ref}
    />
  );
};

ButtonForRefTest.propTypes = {
  testRefAttrName: PropTypes.string.isRequired,
  testRefAttrValue: PropTypes.string.isRequired,
};
