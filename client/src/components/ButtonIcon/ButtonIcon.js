import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

export const BUTTON_ICON = {
  cancel: 'fas fa-times',
  confirm: 'fas fa-check',
  pencil: 'fas fa-pencil-alt',
  plus: 'fas fa-plus',
};

export const BUTTON_SIZE = {
  medium: '',
  small: 'button-icon--small',
};

export const BUTTON_TYPE = {
  button: 'button',
  submit: 'submit',
};

class ButtonIcon extends Component {
  render() {
    const { props } = this;
    const {
      className,
      icon,
      onClick,
      onMouseDown,
      size,
      submitting,
      type,
      to,
    } = props;

    let element;
    const elementProps = {
      className: classnames(
        'button-icon',
        BUTTON_ICON[icon],
        BUTTON_SIZE[size],
        className,
      ),
      disabled: submitting,
      onClick: onClick,
      onMouseDown: onMouseDown,
      type: BUTTON_TYPE[type],
    };

    if (to) {
      element = Link;
      elementProps.to = to;
    } else {
      element = 'button';
    }

    return React.createElement(element, elementProps, null);
  }
}

export default ButtonIcon;
