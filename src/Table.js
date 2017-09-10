import React, {Component} from 'react';
import './Table.scss';

export default class Table extends Component {
	render() {
		const { groups = [], headings = [] } = this.props;
		return <div className="Table" >
            <table>
                {
                    headings.length ? (<thead>
                        <tr>
                            { headings.map( (heading, headingIndex) => (<th key={headingIndex}>{ heading }</th>) ) }
                        </tr>
                    </thead>) : null
                }
                <tbody>
                    { groups.map( (group, groupIndex) => {
                        const isFirstGroup = groupIndex === 0;
                        const labelCols = group.length && group[0].label ? 1 : 0 ;
                        const cols = (group.length && Array.isArray(group[0].value) ? group[0].value.length : 1) + labelCols;
                        console.log('labelCols', labelCols);
                        console.log('cols', cols);
                        const divider = isFirstGroup ? [] : [<tr key={'divider-' + groupIndex} className="Table_groupDivider"><td colSpan={cols} ></td></tr>];
                        return divider.concat(
                            group.map( ({label, value}, lineIndex) => {
                                const values = Array.isArray(value) ? value : [value];
                                return [<tr key={lineIndex}>
                                        { label ? <th>{ label }</th> : null }
                                        { values.map( (value, valueIndex) => (
                                            <td key={valueIndex}>{ value }</td>
                                        ) ) }
                                    </tr>,
                                ]
                            } )
                        )
                    } ) }
                </tbody>
            </table>
		</div>;
	}	
};
