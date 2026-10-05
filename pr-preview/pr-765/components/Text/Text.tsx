import React from 'react';
import type { CSSProperties } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { getRootClampClassName } from './_helpers/getRootClampClassName';
import { getRootHyphensClassName } from './_helpers/getRootHyphensClassName';
import { getRootWordWrappingClassName } from './_helpers/getRootWordWrappingClassName';
import styles from './Text.module.scss';
import type { TextProps } from './Text.types';

export const Text: React.FunctionComponent<TextProps> = ({
  blockLevel = false,
  children,
  hyphens = 'none',
  lines,
  wordWrapping = 'normal',
  ...restProps
}: TextProps) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  const HtmlElement = blockLevel ? 'div' : 'span';

  return (
    <HtmlElement
      {...transferProps(restProps)}
      className={(hyphens !== 'none' || (lines !== undefined && lines > 0) || wordWrapping !== 'normal')
        ? classNames(
          getRootClampClassName(styles, lines),
          getRootHyphensClassName(styles, hyphens),
          getRootWordWrappingClassName(styles, wordWrapping),
        )
        : undefined}
      style={(lines !== undefined && lines > 1) ? { '--rui-custom-lines': lines } as CSSProperties : undefined}
    >
      {children}
    </HtmlElement>
  );
};

export const TextWithGlobalProps = withGlobalProps<TextProps, HTMLElement>(Text, 'Text');

export default TextWithGlobalProps;
