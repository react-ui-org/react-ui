import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import { withTranslationContext } from '../Translation';
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
        <div className="offset-3">
          <TextField
            fieldId="newPassword"
            changeHandler={event => props.onChangeHandler('newPassword', event.target.value)}
            label={props.translations.newPassword}
            type="password"
            fullWidth
            required
          />
          <TextField
            fieldId="newPasswordRepeat"
            changeHandler={event => props.onChangeHandler('newPasswordRepeat', event.target.value)}
            label={props.translations.repeatNewPassword}
            type="password"
            fullWidth
            required
          />
        </div>
        <Button label={props.translations.changePassword} block type="submit" />
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
  translations: PropTypes.shape({
    changePassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    repeatNewPassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(NewPassword, 'NewPassword');
