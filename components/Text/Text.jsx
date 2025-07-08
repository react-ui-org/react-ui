import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { getRootClampClassName } from './_helpers/getRootClampClassName';
import { getRootHyphensClassName } from './_helpers/getRootHyphensClassName';
import { getRootWordWrappingClassName } from './_helpers/getRootWordWrappingClassName';
import styles from './Text.module.scss';

export const Text = ({
  blockLevel,
  children,
  hyphens,
  lines,
  wordWrapping,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  const HtmlElement = blockLevel ? 'div' : 'span';

  return (
    <HtmlElement
      {...transferProps(restProps)}
      className={(hyphens !== 'none' || lines > 0 || wordWrapping !== 'normal')
        ? classNames(
          getRootClampClassName(lines, styles),
          getRootHyphensClassName(hyphens, styles),
          getRootWordWrappingClassName(wordWrapping, styles),
        )
        : undefined}
      style={(lines > 1) ? { '--rui-custom-lines': lines } : undefined}
    >
      {children}
    </HtmlElement>
  );
};

Text.defaultProps = {
  blockLevel: false,
  children: null,
  hyphens: 'none',
  lines: undefined,
  wordWrapping: 'normal',
};

Text.propTypes = {
  /**
   * If true, the root HTML element renders as `<div>` instead of `<span>`.
   */
  blockLevel: PropTypes.bool,
  /**
   * Text content to be sanitized. Can contain HTML.
   */
  children: PropTypes.node,
  /**
   * Turn on hyphenation. Head to [Hyphens](#hyphens) to learn more.
   */
  hyphens: PropTypes.oneOf(['none', 'auto', 'manual']),
  /**
   * Optional number of lines. If exceeded, the content is truncated and appended by an ellipsis (`…`).
   */
  lines: PropTypes.number,
  /**
   * How to deal with long words. Head to [Word Wrapping](#word-wrapping) for detailed explanation.
   */
  wordWrapping: PropTypes.oneOf(['normal', 'long-words', 'anywhere']),
};

export const TextWithGlobalProps = withGlobalProps(Text, 'Text');

export default TextWithGlobalProps;
