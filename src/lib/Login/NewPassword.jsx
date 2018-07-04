import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import styles from './NewPassword.scss';

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
        {props.error && (
          <div className={styles.error}>
            {props.error}
          </div>
        )}
        <TextField
          fieldId="newPassword"
          changeHandler={event => props.onChangeHandler('newPassword', event.target.value)}
          label="New password"
          type="password"
          required
        />
        <TextField
          fieldId="newPasswordRepeat"
          changeHandler={event => props.onChangeHandler('newPasswordRepeat', event.target.value)}
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
  error: null,
  footer: null,
  logoUrl: null,
  onChangeHandler: null,
  submitHandler: null,
  title: null,
};

NewPassword.propTypes = {
  error: PropTypes.string,
  footer: PropTypes.element,
  logoUrl: PropTypes.string,
  onChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
};

export default NewPassword;
