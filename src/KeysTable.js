import React, {Component} from 'react';
import Input from './Input';
import Alert from './Alert';
import './KeysTable.scss';

export default class KeysTable extends Component {

    constructor(props) {
        super(props);
        this.inputRefs = [];
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
			invalidElements: [],
			dirty: false,
			alertProps: null,
		};
    }

    handleSubmit(event){
		const thisForm = this;
		event.preventDefault();
		if ( !this.props.updateUrl ) {
			alert('Missing "updateUrl" in componentProps!');
			return;
		}
        const formData = this.inputRefs.map( (line = [], lineIndex) => {
            return Object.keys(line).reduce( (lineObject, inputKey, inputIndex) => {
                const input = line[inputKey];
                return {
                    ...lineObject,
                    [inputKey]: ((input.type === 'checkbox') ? input.checked : input.value)
                };
            }, {} );
        } );
        console.log('formData', formData);
        
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

	render() {
        const { keys = [], formProps = {} } = this.props;
        const {formElements} = formProps;
            return <form className="Table KeysTable" onSubmit={this.handleSubmit}>
            <table>
                {
                    formElements.length ? (<thead>
                        <tr>
                            { formElements.map( ({label}, headingIndex) => (<th key={headingIndex}>{ label }</th>) ) }
                        </tr>
                    </thead>) : null
                }
                <tbody>
                    { keys.map( (keyData, lineIndex) => {
                        return (<tr key={lineIndex}>{
                            formElements.map( ({name, label, value, ...elementProps}, formElementIndex) => {
                                const defaultValue = keyData[name];
                                console.log('defaultValue', defaultValue, value);
                                return <td key={formElementIndex} title={label}><Input {...elementProps} defaultValue={defaultValue} inputRef={(input) => {
                                    this.inputRefs[lineIndex] = this.inputRefs[lineIndex] || {};
                                    this.inputRefs[lineIndex][name] = input;
                                }} /></td>
                            } )
                        }</tr>);
                    } ) }
                </tbody>
            </table>
            { this.state.alertProps ? <Alert {...this.state.alertProps} /> : null }
            <button className="btn btn_primary Form_submit" type="submit" >Odeslat</button>
		</form>;
	}	
};
