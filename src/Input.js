import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Input.scss';

export default class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.any,
    inline: PropTypes.bool,
    inherit: PropTypes.bool,
    multiple: PropTypes.bool,
    inputRef: PropTypes.func,
    inputClassName: PropTypes.string,
    className: PropTypes.string,
    handleChange: PropTypes.func,
    handleChangeParams: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  inputTemplates = {
    text: ({path, inputRef, type, inputClassName, ...props})=>(
      <input
        {...props}
        ref={inputRef}
        className={classnames(['Input'], inputClassName)}
        type={type}
        key={path}
        onChange={this.handleChange}
      />
    ),
    textarea: ({path, inputRef, inputClassName, ...props})=>(
      <textarea
        {...props}
        inputRef={inputRef}
        className={classnames(['Input', 'Input--textarea'], inputClassName)}
        key={path}
        onChange={this.handleChange}
      />
    ),
    checkbox: ({path, inputRef, inputClassName, value, defaultValue, ...props})=>{
      const checkedProperty = value !== undefined ? { checked: !!value } : { defaultChecked: !!defaultValue };
      // console.log('path', path, 'inputRef', inputRef, 'value', value, '...props', props );
      return (<input
              {...props}
              ref={inputRef}
              className={classnames(['Input', 'Input--checkbox'], inputClassName)}
              type="checkbox"
              key={path}
              {...checkedProperty}
              onChange={this.handleChange}
            />);
    },
    select: ({path, options = [], inputRef, inputClassName, ...props})=>(
      <select
        {...props}
        ref={inputRef}
        className={classnames(['Input', 'Input--select'], inputClassName)}
        type="select"
        key={path}
        onChange={this.handleChange}
      >
        { options.map( (option, optionIndex) => (
          <option key={optionIndex} value={ option.value } >{option.label || option.value}</option>
        ) ) }
      </select>
    )
  }

  handleChange(event) {
    if (this.props.handleChange) {
      let value = event.target.value;
      if (this.props.type === 'checkbox' || this.props.type === 'stressbox') {
        value = event.target.checked;
      } else if ( this.props.type === 'select' && this.props.multiple ) {
        const options = event.target.options;
        value = Array.from(options).filter( (option)=>(option.selected) ).map( (option) => (
          option.value
        ) );
      }
      this.props.handleChange(value, this.props.handleChangeParams );
    }
  }

  render() {
    const {
      label,
      className = '',
      inputClassName = '',
      type = 'text',
      inline,
      inherit,
      ...props,
    } = this.props;

    const template = type in this.inputTemplates ? type : 'text';
    const classNames = ['Label', 'Label--' + type].concat(className.split(' '));
    if (inline) {
      classNames.push('Label--inline');
    }
    if (inherit) {
      classNames.push('Label--inherit');
    }

    return (<label className={classNames.join(' ')}>
      {label ? <span className={'Label-text'} >{label}</span> : null}
      <div className={'Label-inputWrap'} >
      {this.inputTemplates[template]({
        ...props,
        inputClassName,
        type,
      })}
      {type === 'checkbox' ? <span className={'Input-fauxCheckbox'} ></span> : null}
      </div>
    </label>);
  }
}
