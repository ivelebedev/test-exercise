import React from 'react';
import { connect } from 'react-redux';

import { actions } from './actions';

import Header from './components/Header';
import FormCode from './components/FormCode';
import Messages from './components/Messages';

import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.tick = this.tick.bind(this);
		//console.log(this.props);
		this.state = {
			timer: null
		};
	}
	handleSubmit(values) {
		this.props.addMessage(values);
	}
	componentDidMount() {
		let timer = setInterval(this.tick, 5000);
		this.setState({timer});
	}
	componentWillUnmount() {
		this.clearInterval(this.state.timer);
	}
	tick() {
		const { getStatus, messages } = this.props;
		getStatus(messages.items);
	}
	render() {
		
		const { messages } = this.props;
		
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
    addMessage: actions.addMessage,
	getStatus: actions.getStatus
}

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;