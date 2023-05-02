import React, { CSSProperties } from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getRootClampClassName } from './_helpers/getRootClampClassName';
import { getRootHyphensClassName } from './_helpers/getRootHyphensClassName';
import { getRootWordWrappingClassName } from './_helpers/getRootWordWrappingClassName';
import styles from './Text.scss';
import { TextProps } from './Text.types';

export const Text: React.FunctionComponent<TextProps> = ({
  blockLevel = false,
  children = null,
  hyphens = 'none',
  lines,
  wordWrapping = 'normal',
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  const HtmlElement = blockLevel ? 'div' : 'span';

  return (
    <HtmlElement
      {...transferProps(restProps)}
      className={(hyphens !== 'none' || (lines && lines > 0) || wordWrapping !== 'normal')
        ? classNames(
          // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
          getRootClampClassName(lines!, styles),
          getRootHyphensClassName(hyphens, styles),
          getRootWordWrappingClassName(wordWrapping, styles),
        )
        : undefined}
      style={(lines && lines > 1) ? { '--rui-custom-lines': lines } as CSSProperties : undefined}
    >
      {children}
    </HtmlElement>
  );
};

export const TextWithGlobalProps = withGlobalProps(Text, 'Text');

export default TextWithGlobalProps;
