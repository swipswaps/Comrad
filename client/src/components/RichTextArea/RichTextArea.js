import React, { Component } from 'react';
import classnames from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const ICON_SET = {
  search: <i className="icon fas fa-search" />,
  user: <i className="icon fas fa-user" />,
};

export const RichTextAreaError = props => {
  const { children } = props;
  return <div className="richtextarea__error">{children}</div>;
};

export const RichTextAreaLabel = props => {
  const {
    active,
    children,
    dirty,
    error,
    initial,
    touched,
    dirtyOverride,
  } = props;

  return (
    <div
      className={classnames(
        'input__label',
        (active || initial) && 'active',
        (dirty || dirtyOverride) && 'dirty',
        touched && error && 'error',
      )}
    >
      {children}
    </div>
  );
};

class RichTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      ['clean'],
    ],
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  render() {
    const { props } = this;

    const {
      autoFocus,
      className,
      icon,
      inline,
      input,
      label,
      meta,
      type,
      dirtyOverride = false,
      ...other
    } = props;
    const { error, touched } = meta;

    return (
      <div
        className={classnames('form-group', className, {
          'form-group--inline': inline,
        })}
      >
        <div className="editor-container" onClick={this.focus}>
          <ReactQuill
            {...input}
            {...other}
            autoFocus={autoFocus}
            ref={element => {
              this.editor = element;
            }}
            className={classnames('richtextarea', touched && error && 'error')}
            type={type}
            onBlur={() => input.onBlur()}
            modules={this.modules}
            formats={this.formats}
          />

          {label && (
            <RichTextAreaLabel {...meta} dirtyOverride={dirtyOverride}>
              {label}
            </RichTextAreaLabel>
          )}
          {touched && error && <RichTextAreaError>{error}</RichTextAreaError>}
          {icon && ICON_SET[icon]}
        </div>
      </div>
    );
  }
}

export default RichTextArea;
