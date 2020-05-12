import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import { withTranslationContext } from '../../../translation';
import styles from './ForgotPassword.scss';

const ForgotPassword = (props) => (
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
            autoComplete="username"
            changeHandler={(event) => props.onChangeHandler('email', event.target.value)}
            id={props.id ? `${props.id}__resetEmailInput` : 'resetEmailInput'}
            label={props.translations.email}
            type={props.usernameType === 'email' ? 'email' : 'text'}
            fullWidth
            required
          />
        </div>
        <Button
          block
          label={props.translations.resetPassword}
          type="submit"
          {...(props.id && { id: `${props.id}__resetPasswordButton` })}
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

ForgotPassword.defaultProps = {
  error: null,
  footer: null,
  id: undefined,
  logoUrl: null,
  onChangeHandler: null,
  submitHandler: null,
  title: null,
  usernameType: 'email',
};

ForgotPassword.propTypes = {
  error: PropTypes.string,
  footer: PropTypes.node,
  id: PropTypes.string,
  logoUrl: PropTypes.string,
  onChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  translations: PropTypes.shape({
    email: PropTypes.string.isRequired,
    resetPassword: PropTypes.string.isRequired,
  }).isRequired,
  usernameType: PropTypes.string,
};

export default withTranslationContext(ForgotPassword, 'ForgotPassword');
