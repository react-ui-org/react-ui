import React, { useContext } from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Alert.scss';
import { AlertProps } from './Alert.types';

export const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  color = 'note',
  icon,
  id,
  onClose,
  ...restProps
}) => {
  const { translations } = useContext(RUIContext);

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
        title={translations?.Alert.close}
      >
        <span className={styles.closeSign}>×</span>
      </button>
      )}
    </div>
  );
};

export const AlertWithGlobalProps = withGlobalProps(Alert, 'Alert');

export default AlertWithGlobalProps;

