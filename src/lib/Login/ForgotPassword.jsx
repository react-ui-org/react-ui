import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import styles from './ForgotPassword.scss';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console

const ForgotPassword = props => (
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
            Invalid e-mail
          </div>
        )}
        <TextField
          fieldId="resetemail"
          changeHandler={logger}
          label="E-mail"
          type="email"
          required
        />
        <Button label="Reset password" block priority="primary" type="submit" />
      </form>
      {props.footer && (
        <div className={styles.footer}>
          {props.footer}
        </div>
      )}
    </div>
  </div>
);

ForgotPassword.defaultProps = {
  footer: null,
  hasError: false,
  logoUrl: null,
  submitHandler: null,
  title: null,
};

ForgotPassword.propTypes = {
  footer: PropTypes.element,
  hasError: PropTypes.bool,
  logoUrl: PropTypes.string,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
};

export default ForgotPassword;
