import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Alert.scss';

export const Alert = ({
  children,
  color,
  icon,
  id,
  onClose,
  translations,
}) => (
  <div
    className={classNames(
      styles.root,
      getRootColorClassName(color, styles),
    )}
    id={id}
    role="alert"
  >
    {icon && (
      <div className={styles.icon}>
        {icon}
      </div>
    )}
    <div
      className={styles.message}
      {...(id && { id: `${id}__content` })}
    >
      {children}
    </div>
    {onClose && (
      <button
        type="button"
        {...(id && { id: `${id}__close` })}
        className={styles.close}
        onClick={() => onClose()}
        onKeyPress={() => onClose()}
        tabIndex="0"
        title={translations.close}
      >
        <span className={styles.closeSign}>×</span>
      </button>
    )}
  </div>
);

Alert.defaultProps = {
  color: 'note',
  icon: null,
  id: undefined,
  onClose: null,
};

Alert.propTypes = {
  /**
   * Alert body.
   */
  children: PropTypes.node.isRequired,
  /**
   * [Color variant](/foundation/colors#component-colors) to clarify importance and meaning of the alert.
   */
  color: PropTypes.oneOf(
    ['primary', 'secondary', 'success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark'],
  ),
  /**
   * Optional element to be displayed next to the alert body.
   */
  icon: PropTypes.node,
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__close`
   * * `<ID>__content`
   */
  id: PropTypes.string,
  /**
   * Function to call when the close button is clicked. If not provided, close buttons will be
   * hidden.
   */
  onClose: PropTypes.func,
  /**
   * Translations required by the component.
   */
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export const AlertWithContext = withProviderContext(Alert, 'Alert');

export default AlertWithContext;
