import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { TranslationsContext } from '../../providers/translations';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Alert.module.scss';
import type { AlertProps } from './Alert.types';

export const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  color = 'note',
  icon,
  id,
  onClose,
  ...restProps
}: AlertProps) => {
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
          // eslint-disable-next-line @typescript-eslint/no-deprecated
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
Alert.propTypes = {
  /**
   * Alert body.
   */
  children: PropTypes.node.isRequired,
  /**
   * Color variant to clarify importance and meaning of the alert. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color: PropTypes.oneOf(['success', 'warning', 'danger', 'help', 'info', 'note']),
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
};

export const AlertWithGlobalProps = withGlobalProps<AlertProps, never>(Alert, 'Alert');

export default AlertWithGlobalProps;
