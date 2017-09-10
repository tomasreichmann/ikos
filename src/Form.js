import './Form.scss';
import React, {Component} from 'react';
import Alert from './Alert';

export default class Form extends Component {
	constructor(props){
		super(props);
		this.componentMap = {
			Checkbox: (element, handleChange) => {
				const { value, ...elementProps } = element;
				return <input className="Input" type="checkbox" defaultChecked={value || false} onChange={handleChange} {...elementProps} />
			},
			Input: (element, handleChange) => {
				const { value, ...elementProps } = element;
				return <input className="Input" type="text" defaultValue={element.value} {...elementProps} onChange={handleChange} />
			},
			Select: (element, handleChange) => {
                const { value, options, ...elementProps } = element;
				return <select className="Input" type="text" defaultValue={element.value} {...elementProps} onChange={handleChange} >
                    {options.map( ({label, value}) => (
                        <option value={value}>{label}</option>
                    ) )}
                </select>
			},
		};
		this.state = {
			invalidElements: [],
			dirty: false,
			alertProps: null,
		};
		this.renderFormElement = this.renderFormElement.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event){
		let invalidElements = [];
		if (this.formElement.new_password && this.formElement.new_password_repeat && this.formElement.new_password.value !== this.formElement.new_password_repeat.value) {
			invalidElements.push('new_password_repeat');
		}
		this.setState({
			...this.state,
			dirty: true,
			alertProps: null,
			invalidElements: this.state.invalidElements.filter( (name)=>(
				name !== event.target.name
			) ).concat(invalidElements),
		});
	}
	
	handleSubmit(event){
		const thisForm = this;
		event.preventDefault();
		if ( !this.props.updateUrl ) {
			alert('Missing "updateUrl" in componentProps!');
			return;
		}
		console.dir(this.formElement);
		const formData = Array.from(this.formElement).reduce( (formData, element)=>(
			{
				...formData,
				[element.name]: ((element.type === 'checkbox') ? element.checked : element.value),
			}
		), {} );
		const requestPromise = this.props.sendData(this.props.updateUrl, formData);
		console.log('requestPromise', requestPromise);
		requestPromise.then(
			()=>(
				thisForm.setState({
					...thisForm.state,
					invalidElements: [],
					dirty: false,
					alertProps: {
						success: true,
						children: 'Data úspěšně odeslána',
					}
				})
			),
			(error)=>(
				thisForm.setState({
					...thisForm.state,
					invalidElements: error.invalidElements,
					dirty: false,
					alertProps: {
						danger: true,
						children: error.errorMessage || 'Formulář obsahuje neplatná data.',
					}
				})
			)
		);
	}
	
	renderFormElement(element, elementIndex) {
		const { componentName, ...elementProps } = element;
        return this.componentMap[componentName]
            ? <label key={elementIndex} className={'Form_formElement Form_formElement_' + (((this.state.invalidElements || []).indexOf(element.name) > -1) ? 'invalid' : 'valid') } >
                <span className="Form_label" >{element.label}</span>
                <span className="Form_control" >{ this.componentMap[componentName](elementProps, this.handleChange) }</span>
            </label>
            : <Alert key={elementIndex} warning>formComponent {componentName} not found. Available formComponent types: { Object.keys(this.componentMap).join(', ') }</Alert>;
	}
	
	render() {
		const { formElements = [], text = null } = this.props;
		return <div className="Form" >
            {text ? <p>{text}</p> : null}
			<form name="form" ref={ (formElement) => (this.formElement = formElement ) } onSubmit={this.handleSubmit} >
				{ formElements.map( this.renderFormElement ) }
				{ this.state.alertProps ? <Alert {...this.state.alertProps} /> : null }
				<button className="btn btn_primary Form_submit" type="submit" disabled={ !this.state.dirty || (this.state.invalidElements.length > 0) } >Odeslat</button>
			</form>
		</div>;
	}	
};
