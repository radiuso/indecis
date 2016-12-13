import React from 'react';
import './style.scss';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			question: "",
			possibilities: []
		};
	}

	handleQuestionChange(event) {
		this.setState({
			question: event.target.value
		});
	}
	render() {
		return (
			<div className="ok">
				<input 
					value={this.state.question}
					onChange={this.handleQuestionChange.bind(this)} />
			</div>
		)
	}
}

export default Home;