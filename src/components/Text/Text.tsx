import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getRootClampClassName } from './_helpers/getRootClampClassName';
import { getRootHyphensClassName } from './_helpers/getRootHyphensClassName';
import { getRootWordWrappingClassName } from './_helpers/getRootWordWrappingClassName';
import styles from './Text.module.scss';
import { TextProps } from './Text.types';

export const Text: React.FunctionComponent<TextProps> = ({
  blockLevel = false,
  children,
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
          getRootClampClassName(styles, lines),
          getRootHyphensClassName(hyphens, styles),
          getRootWordWrappingClassName(wordWrapping, styles),
        )
        : undefined}
      style={(lines && lines > 1) ? { '--rui-custom-lines': lines } as React.CSSProperties : undefined}
    >
      {children}
    </HtmlElement>
  );
};

export const TextWithGlobalProps = withGlobalProps(Text, 'Text');

export default TextWithGlobalProps;
