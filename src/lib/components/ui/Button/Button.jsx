import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import getRootSizeClassName from '../../../helpers/getRootSizeClassName';
import getRootColorClassName from '../../../helpers/getRootColorClassName';
import { resolveContextOrProp } from '../../../helpers/resolveContextOrProp';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import { ButtonGroupContext } from '../ButtonGroup';
import getRootLabelVisibilityClassName from './helpers/getRootLabelVisibilityClassName';
import getRootPriorityClassName from './helpers/getRootPriorityClassName';
import styles from './Button.scss';

export const Button = ({
  afterLabel,
  beforeLabel,
  block,
  clickHandler,
  disabled,
  endCorner,
  forwardedRef,
  id,
  label,
  labelVisibility,
  loadingIcon,
  priority,
  size,
  startCorner,
  type,
  color,
  ...restProps
}) => {
  const context = useContext(ButtonGroupContext);

  return (
    /* No worries, `type` is always assigned correctly through props. */
    /* eslint-disable react/button-has-type */
    <button
      {...transferProps(restProps)}
      className={
        priority === 'link'
          ? [
            styles.root,
            getRootPriorityClassName(priority, styles),
          ].join(' ')
          : [
            styles.root,
            getRootPriorityClassName(
              resolveContextOrProp(context?.priority, priority),
              styles,
            ),
            getRootColorClassName(color, styles),
            getRootSizeClassName(
              resolveContextOrProp(context?.size, size),
              styles,
            ),
            getRootLabelVisibilityClassName(labelVisibility, styles),
            resolveContextOrProp(context?.block, block) ? styles.rootBlock : '',
            context ? styles.rootGrouped : '',
            loadingIcon ? styles.isRootLoading : '',
          ].join(' ')
      }
      disabled={resolveContextOrProp(context?.disabled, disabled) || !!loadingIcon}
      id={id}
      onClick={clickHandler}
      ref={forwardedRef}
      type={type}
    >
      {priority !== 'link' && startCorner && (
        <span className={styles.startCorner}>
          {startCorner}
        </span>
      )}
      {beforeLabel && (
        <span className={styles.beforeLabel}>
          {beforeLabel}
        </span>
      )}
      <span
        className={styles.label}
        {...(id && { id: `${id}__labelText` })}
      >
        {label}
      </span>
      {afterLabel && (
        <span className={styles.afterLabel}>
          {afterLabel}
        </span>
      )}
      {priority !== 'link' && endCorner && (
        <span className={styles.endCorner}>
          {endCorner}
        </span>
      )}
      {priority !== 'link' && loadingIcon && (
        <span className={styles.loadingIcon}>
          {loadingIcon}
        </span>
      )}
    </button>
    /* eslint-enable react/button-has-type */
  );
};

Button.defaultProps = {
  afterLabel: null,
  beforeLabel: null,
  block: false,
  clickHandler: null,
  color: 'primary',
  disabled: false,
  endCorner: null,
  forwardedRef: undefined,
  id: undefined,
  labelVisibility: 'all',
  loadingIcon: null,
  priority: 'filled',
  size: 'medium',
  startCorner: null,
  type: 'button',
};

Button.propTypes = {
  /**
   * Element to be displayed after label, eg. an icon.
   */
  afterLabel: PropTypes.node,
  /**
   * Element to be displayed before label, eg. an icon.
   */
  beforeLabel: PropTypes.node,
  /**
   * If `true`, the button will span the full width of its parent. Only available if `priority` != `link`.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  block: PropTypes.bool,
  /**
   * Function to call when the button is clicked.
   */
  clickHandler: PropTypes.func,
  /**
   * [Color variant](/foundation/colors#component-colors) to clarify importance and meaning of the button.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark']),
  /**
   * If `true`, the button will be disabled.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  disabled: PropTypes.bool,
  /**
   * Element to be displayed in the top right corner. Only available if `priority` != `link`.
   */
  endCorner: PropTypes.node,
  /**
   * Reference forwarded to the `button` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__labelText`
   */
  id: PropTypes.string,
  /**
   * Button label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Defines when the button label should be visible. Only available if `priority` != `link`.
   */
  labelVisibility: PropTypes.oneOf(['all', 'desktop', 'none']),
  /**
   * Element to be displayed as a loading icon. When defined, it implies the button is in the
   * loading state. Only available if `priority` != `link`.
   */
  loadingIcon: PropTypes.node,
  /**
   * Visual priority to highlight or suppress the button.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  priority: PropTypes.oneOf(['filled', 'outline', 'flat', 'link']),
  /**
   * Size of the button. Only available if `priority` != `link`.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Element to be displayed in the top left corner. Only available if `priority` != `link`.
   */
  startCorner: PropTypes.node,
  /**
   * Set the HTML `type` attribute of the `button` element.
   */
  type: PropTypes.oneOf(['button', 'submit']),
};

export const ButtonWithContext = withForwardedRef(withProviderContext(Button, 'Button'));

export default ButtonWithContext;
