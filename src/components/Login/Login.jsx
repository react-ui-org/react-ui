import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import styles from './Login.scss';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console

const Login = props => (
  <div className={styles.root}>
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
      <div className={styles.title}>
        {props.title}
      </div>
    )}
    <div className={styles.box}>
      <form onSubmit={props.submitHandler}>
        {props.hasError && (
          <div className={styles.error}>
            Invalid username or password
          </div>
        )}
        <TextField
          fieldId={props.usernameType === 'email' ? 'email' : props.usernameType}
          changeHandler={logger}
          label={props.usernameType === 'email' ? 'E-mail' : props.usernameType}
          type={props.usernameType === 'email' ? 'email' : 'text'}
          required
        />
        <TextField
          fieldId="password"
          changeHandler={logger}
          label="Password"
          type="password"
          required
        />
        <Button label="Sign in" block priority="primary" type="submit" />
      </form>
      {props.footer && (
        <div className={styles.footer}>
          {props.footer}
        </div>
      )}
    </div>
  </div>
);

Login.defaultProps = {
  footer: null,
  hasError: false,
  logoUrl: null,
  submitHandler: null,
  title: null,
  usernameType: 'email',
};

Login.propTypes = {
  footer: PropTypes.element,
  hasError: PropTypes.bool,
  logoUrl: PropTypes.string,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  usernameType: PropTypes.oneOf(['email', PropTypes.string]),
};

export default Login;
