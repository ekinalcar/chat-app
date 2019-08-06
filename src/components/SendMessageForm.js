import React from 'react';

class SendMessageForm extends React.Component {
	constructor(){
		super();
		this.state = {
			message:''
		};
	}

	handleChange = (text) => {
		this.setState({ message: text.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({ message: '' });
	}

	render() {
		return (
			<form
				onSubmit={this.handleSubmit}
				className="send-message-form">
				<input
					disabled = {this.props.disabled}
					onChange = {this.handleChange}
					value={this.state.message}
					placeholder="Type Your Message Here"
					type="text" />
			</form>
		);
	}
}

export default SendMessageForm;
