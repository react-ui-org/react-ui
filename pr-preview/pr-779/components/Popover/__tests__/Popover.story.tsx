import React, {
  useEffect,
  useRef,
} from 'react';
import {
  Popover,
  PopoverWrapper,
} from '..';
import type { PopoverProps } from '..';
import { Button } from '../../Button';
import type { StoryProps } from '../../../../tests/playwright';

type PopoverForTestProps = StoryProps<PopoverProps, 'children'>;
type PopoverForRefTestProps = PopoverForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};

const multilineBox = (
  <div
    style={{
      background: '#00778b',
      color: 'white',
      padding: '20px',
    }}
  >
    Multiline
    <br />
    text
  </div>
);

export const PopoverForTest = ({
  ...props
}: PopoverForTestProps) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <div
      style={{
        display: 'grid',
        minHeight: '15rem',
        padding: '20px',
        placeContent: 'center',
      }}
    >
      <PopoverWrapper>
        {multilineBox}
        <Popover {...restProps}>
          {children ?? 'Popover content.'}
        </Popover>
      </PopoverWrapper>
    </div>
  );
};

export const PopoverWithTargetIdForTest = ({
  ...props
}: PopoverForTestProps) => {
  const {
    children,
    popoverTargetId,
    ...restProps
  } = props;

  return (
    <div
      style={{
        display: 'grid',
        minHeight: '15rem',
        padding: '20px',
        placeContent: 'center',
      }}
    >
      <PopoverWrapper>
        <Button
          label="Button with target id"
          {...{ popovertarget: popoverTargetId }}
        />
        <Popover
          {...restProps}
          popoverTargetId={popoverTargetId}
        >
          {children ?? 'Popover content.'}
        </Popover>
      </PopoverWrapper>
    </div>
  );
};

export const PopoverForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
}: PopoverForRefTestProps) => {
  const {
    children,
    ...restProps
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <div
      style={{
        display: 'grid',
        minHeight: '15rem',
        padding: '20px',
        placeContent: 'center',
      }}
    >
      <PopoverWrapper>
        {multilineBox}
        <Popover
          {...restProps}
          ref={ref}
        >
          {children ?? 'Popover content.'}
        </Popover>
      </PopoverWrapper>
    </div>
  );
};
