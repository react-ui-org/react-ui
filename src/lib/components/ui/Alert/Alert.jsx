import PropTypes from 'prop-types';
import React from 'react';
import { withTranslationContext } from '../../../translation';
import styles from './Alert.scss';

const Alert = (props) => {
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
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func,
  icon: PropTypes.node,
  id: PropTypes.string,
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['error', 'help', 'info', 'note', 'success', 'warning']),
};

export default withTranslationContext(Alert, 'Alert');
