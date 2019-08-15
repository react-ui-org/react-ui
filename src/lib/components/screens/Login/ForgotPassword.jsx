import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import { withTranslationContext } from '../../../translation';
import styles from './ForgotPassword.scss';

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
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (props.submitHandler) {
            props.submitHandler(e);
          }
        }}
      >
        {props.error && (
          <div className={styles.error}>
            {props.error}
          </div>
        )}
        <div className="mb-3">
          <TextField
            fieldId="resetEmail"
            changeHandler={event => props.onChangeHandler('email', event.target.value)}
            label={props.translations.email}
            type="email"
            fullWidth
            required
          />
        </div>
        <Button label={props.translations.resetPassword} block type="submit" />
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
  error: null,
  footer: null,
  logoUrl: null,
  onChangeHandler: null,
  submitHandler: null,
  title: null,
};

ForgotPassword.propTypes = {
  error: PropTypes.string,
  footer: PropTypes.element,
  logoUrl: PropTypes.string,
  onChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  translations: PropTypes.shape({
    email: PropTypes.string.isRequired,
    resetPassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(ForgotPassword, 'ForgotPassword');
