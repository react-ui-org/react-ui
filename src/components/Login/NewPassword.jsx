import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import styles from './NewPassword.scss';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console

const NewPassword = props => (
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
            Passwords are not same
          </div>
        )}
        <TextField
          fieldId="newpassword"
          changeHandler={logger}
          label="New password"
          type="password"
          required
        />
        <TextField
          fieldId="newpasswordrepeat"
          changeHandler={logger}
          label="Repeat new password"
          type="password"
          required
        />
        <Button label="Change password" block priority="primary" type="submit" />
      </form>
      {props.footer && (
        <div className={styles.footer}>
          {props.footer}
        </div>
      )}
    </div>
  </div>
);

NewPassword.defaultProps = {
  footer: null,
  hasError: false,
  logoUrl: null,
  submitHandler: null,
  title: null,
};

NewPassword.propTypes = {
  footer: PropTypes.element,
  hasError: PropTypes.bool,
  logoUrl: PropTypes.string,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
};

export default NewPassword;
