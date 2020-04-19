import PropTypes from 'prop-types';
import React, { useState } from 'react';
import withForwardedRef from '../withForwardedRef';

export const MenuButton = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id={props.id}>
      <button
        disabled={props.disabled || !!props.loadingIcon}
        id={props.id ? `${props.id}__expandMenuButton` : undefined}
        onClick={() => setIsExpanded(!isExpanded)}
        ref={props.forwardedRef}
        type="button"
      >
        {props.beforeLabel && (
          <span>
            {props.beforeLabel}
          </span>
        )}
        {props.label}
        {props.afterLabel && (
          <span>
            {props.afterLabel}
          </span>
        )}
        {props.loadingIcon && (
          <span>
            {props.loadingIcon}
          </span>
        )}
      </button>
      {isExpanded && !props.disabled && (
        <div id={props.id ? `${props.id}__expandedMenuContainer` : undefined}>
          {props.buttons.map((button) => {
            if (button.type === 'separator') {
              return <hr />;
            }

            return (
              <button
                disabled={button.disabled || !!button.loadingIcon || props.disabled}
                id={button.id || undefined}
                onClick={(e) => {
                  const handlerResult = button.clickHandler(e);

                  if (handlerResult instanceof Promise) {
                    return handlerResult.then((response) => {
                      setIsExpanded(false);
                      return response;
                    });
                  }

                  setIsExpanded(false);
                  return handlerResult;
                }}
                ref={button.forwardedRef}
                type="button"
              >
                {button.beforeLabel && (
                  <span>
                    {button.beforeLabel}
                  </span>
                )}
                {button.label}
                {button.afterLabel && (
                  <span>
                    {button.afterLabel}
                  </span>
                )}
                {button.loadingIcon && (
                  <span>
                    {button.loadingIcon}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

MenuButton.defaultProps = {
  afterLabel: null,
  beforeLabel: null,
  disabled: false,
  forwardedRef: undefined,
  id: undefined,
  loadingIcon: null,
  priority: 'default',
  size: 'medium',
  variant: 'primary',
};

MenuButton.propTypes = {
  afterLabel: PropTypes.element,
  beforeLabel: PropTypes.element,
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      afterLabel: PropTypes.element,
      beforeLabel: PropTypes.element,
      clickHandler: PropTypes.func,
      disabled: PropTypes.bool,
      forwardedRef: PropTypes.func,
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      loadingIcon: PropTypes.element,
      type: PropTypes.oneOf(['button']),
      variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'dark']),
    }),
    PropTypes.shape({
      type: PropTypes.oneOf(['separator']),
    }),
  ])).isRequired,
  disabled: PropTypes.bool,
  forwardedRef: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  loadingIcon: PropTypes.element,
  priority: PropTypes.oneOf(['default', 'outline', 'flat']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'dark']),
};

export default withForwardedRef(MenuButton);
