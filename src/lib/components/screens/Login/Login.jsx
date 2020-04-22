import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import { withTranslationContext } from '../../../translation';
import styles from './Login.scss';

const Login = (props) => (
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
        {props.hasError && (
          <div
            className={styles.error}
            {...(props.id && { id: `${props.id}__errorText` })}
          >
            {props.translations.invalidUsernameOrPassword}
          </div>
        )}
        <div className="mb-3">
          <TextField
            changeHandler={(event) => props.onChangeHandler('username', event.target.value)}
            htmlElementAttributes={{ autoComplete: 'username' }}
            id={props.id ? `${props.id}__usernameInput` : 'usernameInput'}
            label={props.usernameType === 'email' ? props.translations.email : props.usernameType}
            type={props.usernameType === 'email' ? 'email' : 'text'}
            fullWidth
            required
          />
          <TextField
            changeHandler={(event) => props.onChangeHandler('password', event.target.value)}
            htmlElementAttributes={{ autoComplete: 'current-password' }}
            id={props.id ? `${props.id}__passwordInput` : 'passwordInput'}
            label={props.translations.password}
            type="password"
            fullWidth
            required
          />
        </div>
        <Button
          block
          label={props.translations.signIn}
          type="submit"
          {...(props.id && { id: `${props.id}__signInButton` })}
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

Login.defaultProps = {
  footer: null,
  hasError: false,
  id: undefined,
  logoUrl: null,
  onChangeHandler: null,
  submitHandler: null,
  title: null,
  usernameType: 'email',
};

Login.propTypes = {
  footer: PropTypes.element,
  hasError: PropTypes.bool,
  id: PropTypes.string,
  logoUrl: PropTypes.string,
  onChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  translations: PropTypes.shape({
    email: PropTypes.string.isRequired,
    invalidUsernameOrPassword: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    signIn: PropTypes.string.isRequired,
  }).isRequired,
  usernameType: PropTypes.string,
};

export default withTranslationContext(Login, 'Login');
