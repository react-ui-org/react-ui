import PropTypes from 'prop-types';
import React from 'react';
import getRootColorClassName from '../../../helpers/getRootColorClassName';
import { withProviderContext } from '../../../provider';
import styles from './Alert.scss';

export const Alert = ({
  children,
  closeHandler,
  color,
  icon,
  id,
  translations,
}) => (
  <div
    className={[
      styles.root,
      getRootColorClassName(color, styles),
    ].join(' ')}
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
    {closeHandler && (
      <button
        type="button"
        {...(id && { id: `${id}__close` })}
        className={styles.close}
        onClick={() => closeHandler()}
        onKeyPress={() => closeHandler()}
        tabIndex="0"
        title={translations.close}
      >
        <span className={styles.closeSign}>×</span>
      </button>
    )}
  </div>
);

Alert.defaultProps = {
  closeHandler: null,
  color: 'note',
  icon: null,
  id: undefined,
};

Alert.propTypes = {
  /**
   * Alert body.
   */
  children: PropTypes.node.isRequired,
  /**
   * Function to call when the close button is clicked. If not provided, close buttons will be
   * hidden.
   */
  closeHandler: PropTypes.func,
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
   * Translations required by the component.
   */
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export const AlertWithContext = withProviderContext(Alert, 'Alert');

export default AlertWithContext;
