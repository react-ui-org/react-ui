import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './Alert.scss';

export const Alert = (props) => {
  const {
    children,
    closeHandler,
    icon,
    id,
    translations,
    type,
  } = props;

  const rootTypeClass = (variant) => {
    if (variant === 'success') {
      return styles.isRootSuccess;
    }

    if (variant === 'error') {
      return styles.isRootError;
    }

    if (variant === 'warning') {
      return styles.isRootWarning;
    }

    if (variant === 'info') {
      return styles.isRootInfo;
    }

    if (variant === 'help') {
      return styles.isRootHelp;
    }

    return styles.isRootNote;
  };

  return (
    <div
      className={[
        styles.root,
        rootTypeClass(type),
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
};

Alert.defaultProps = {
  closeHandler: null,
  icon: null,
  id: undefined,
  type: 'note',
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
   * Optional element to be displayed next to the alert body.
   */
  icon: PropTypes.node,
  /**
   * ID of the root HTML element. It also serves as a prefix for alert body and and close button
   * elements: `<ID>__content` and `<ID>__close`.
   */
  id: PropTypes.string,
  /**
   * Translations required by the component.
   */
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * Color variant to clarify importance and meaning of the alert.
   */
  type: PropTypes.oneOf(['error', 'help', 'info', 'note', 'success', 'warning']),
};

export const AlertWithContext = withProviderContext(Alert, 'Alert');

export default AlertWithContext;
