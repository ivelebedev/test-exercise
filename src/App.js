import React from 'react';
import { connect } from 'react-redux';

import { actions } from './actions';

import Header from './components/Header';
import FormCode from './components/FormCode';
import Messages from './components/Messages';
//import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		//console.log(this.props);
	}
	handleSubmit(values) {
		//console.log(this);
		this.props.addMessage(values);
	}
	render() {
		
		const { messages } = this.props;
		console.log(messages);
		
		return (
			<div className="App">

				<Header />

				<div className="container">

					<FormCode onSubmit={this.handleSubmit} />

					<Messages messages={messages} />

				</div>
			</div>
		);
	}
};

function mapState(state) {
    const { messages } = state;
    return { messages };
}

const actionCreators = {
    addMessage: actions.addMessage
}

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;