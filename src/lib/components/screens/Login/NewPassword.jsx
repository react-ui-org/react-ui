import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import { withTranslationContext } from '../../../translation';
import styles from './NewPassword.scss';

const NewPassword = (props) => (
  <div
    className={styles.root}
    id={props.id}
  >
    {props.logoUrl && (
      <div className={styles.logoWrap}>
        <img
          src={props.logoUrl}
          className={styles.logo}
          alt={props.title || 'logo'}
        />
      </div>
    )}
    {props.title && (
      <div
        className={styles.title}
        {...(props.id && { id: `${props.id}__title` })}
      >
        {props.title}
      </div>
    )}
    <div className={styles.box}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (props.submitHandler) {
            props.submitHandler(e);
          }
        }}
      >
        {props.error && (
          <div
            className={styles.error}
            {...(props.id && { id: `${props.id}__errorText` })}
          >
            {props.error}
          </div>
        )}
        <div className="mb-3">
          <TextField
            autoComplete="new-password"
            changeHandler={(event) => props.onChangeHandler('newPassword', event.target.value)}
            id={props.id ? `${props.id}__newPasswordInput` : 'newPasswordInput'}
            label={props.translations.newPassword}
            type="password"
            fullWidth
            required
          />
          <TextField
            autoComplete="new-password"
            changeHandler={(event) => props.onChangeHandler('newPasswordRepeat', event.target.value)}
            id={props.id ? `${props.id}__newPasswordRepeatInput` : 'newPasswordRepeatInput'}
            label={props.translations.repeatNewPassword}
            type="password"
            fullWidth
            required
          />
        </div>
        <Button
          block
          {...(props.id && { id: `${props.id}__changePasswordButton` })}
          label={props.translations.changePassword}
          type="submit"
        />
      </form>
      {props.footer && (
        <div
          className={styles.footer}
          {...(props.id && { id: `${props.id}__footerContent` })}
        >
          {props.footer}
        </div>
      )}
    </div>
  </div>
);

NewPassword.defaultProps = {
  error: null,
  footer: null,
  id: undefined,
  logoUrl: null,
  onChangeHandler: null,
  submitHandler: null,
  title: null,
};

NewPassword.propTypes = {
  error: PropTypes.string,
  footer: PropTypes.node,
  id: PropTypes.string,
  logoUrl: PropTypes.string,
  onChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  translations: PropTypes.shape({
    changePassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    repeatNewPassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(NewPassword, 'NewPassword');
