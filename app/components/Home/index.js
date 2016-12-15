import React from 'react';
import update from 'react-addons-update';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import WordShuffler from 'indecis/WordShuffler';
import './Home.scss';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			question: "Est-ce bien utile ?",
			currentPossibility: "",
			possibilities: [{label: "Mais ouiii", "key": 1}],
            response: {}
		};
	}

	handleQuestionChange(event) {
		this.setState({
			question: event.target.value
		});
	}

	handlePossibilityChange(event) {
		this.setState({
			currentPossibility: event.target.value
		});
	}

	handlePossibilityKeyPress(event) {
		if(event.key == 'Enter') {
			this.addPossibility(this.state.currentPossibility);
			this.setState({
				currentPossibility: ""
			})
		}
	}

	addPossibility(possibility) {
        let prevState = this.state;
        let newPossibility = { key: Date.now(), label: possibility };
        let nextState = update(
            this.state.possibilities, {
                $push: [newPossibility]
            }
        );

        this.setState({possibilities: nextState});
	}

	handleDeletePossibility(key) {
        let prevState = this.state;
        let index = this.state.possibilities.findIndex((possibility) => possibility.key == key);

        let nextState = update(this.state.possibilities, {
            $splice: [[index, 1]]
        });

        this.setState({possibilities: nextState});
	}

    canTakeTheDecision() {
        return this.state.question != '' && this.state.possibilities.length > 0;
    }

    takeDecision() {
        let randNum = Math.floor( Math.random() * this.state.possibilities.length );
        let response = this.state.possibilities[randNum];

        // this.setState({"response": response});
        new WordShuffler(document.getElementById('homeshuffletext'), response.label, {
          textColor : '#000000',
          timeOffset : 18,
          mixCapital : true,
          mixSpecialCharacters : true
        });
    }

	renderChip(data) {
		return (
			<Chip
				key={data.key}
				onRequestDelete={() => this.handleDeletePossibility(data.key)}
				className="chip">
					{data.label}
			</Chip>
		);
	}

	render() {
		return (
            <Paper zDepth={1} className="home">
				<TextField
					hintText="Question"
					floatingLabelText="Question"
					fullWidth={true}
					value={this.state.question}
					onChange={this.handleQuestionChange.bind(this)}
				/>
				<TextField
					hintText="Réponse"
					floatingLabelText="Réponses"
					fullWidth={true}
					value={this.state.currentPossibility}
					onChange={this.handlePossibilityChange.bind(this)}
					onKeyPress={this.handlePossibilityKeyPress.bind(this)}
				/>
                <br />
                <br />
				<div className="wrapper">
					{this.state.possibilities.map(this.renderChip, this)}
				</div>
                <br />
                <RaisedButton 
                    label="Prendre une décision" 
                    fullWidth={true} 
                    primary={true} 
                    disabled={!this.canTakeTheDecision()}
                    onClick={this.takeDecision.bind(this)} />
                <br />
                <div className="response-wrapper">
                    <h1 id="homeshuffletext" className="response">{this.state.response.label}</h1>
                </div>
            </Paper>
		)
	}
}

export default Home;