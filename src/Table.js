import React, {Component} from 'react';

export default class Table extends Component {
	render() {
		const { groups = [] } = this.props;
		return <div className="Table" >
			{ groups.map( (group, groupIndex) => (
				<table key={groupIndex} >
					<tbody>
						{ group.map( (line, lineIndex) => (
						<tr key={lineIndex}><th>{ line.label }</th><td>{ line.value }</td></tr>
						) ) }
					</tbody>
				</table>
			) ) }
		</div>;
	}	
};
