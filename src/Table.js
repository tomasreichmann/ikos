import React, {Component} from 'react';

export default class Table extends Component {
	render() {
		const { groups = [], headings = [] } = this.props;
		return <div className="Table" >
            {
                headings.length ? (<table >
                    <tbody>
                        <tr>
                            { headings.map( (heading, headingIndex) => (<th key={headingIndex}>{ heading }</th>) ) }
                        </tr>
                    </tbody>
                </table>) : null
            }
			{ groups.map( (group, groupIndex) => (
				<table key={groupIndex} >
					<tbody>
						{ group.map( ({label, value}, lineIndex) => {
                            const values = Array.isArray(value) ? value : [value];
						    return <tr key={lineIndex}>
                                { label ? <th>{ label }</th> : null }
                                { values.map( (value, valueIndex) => (
                                    <td key={valueIndex}>{ value }</td>
                                ) ) }
                            </tr>
                        } ) }
					</tbody>
				</table>
			) ) }
		</div>;
	}	
};
