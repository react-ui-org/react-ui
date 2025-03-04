import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { TranslationsContext } from '../../providers/translations';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Alert.module.scss';
import { AlertProps } from './Alert.types';

export const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  color = 'note',
  icon = null,
  id,
  onClose = null,
  ...restProps
}) => {
  const translations = useContext(TranslationsContext);

  return (
    <div
      {...transferProps(restProps)}
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
          tabIndex={0}
          title={translations.Alert.close}
        >
          <span className={styles.closeSign}>×</span>
        </button>
      )}
    </div>
  );
};

export const AlertWithGlobalProps = withGlobalProps(Alert, 'Alert');

export default AlertWithGlobalProps;
