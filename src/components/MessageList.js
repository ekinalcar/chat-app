import React from 'react';
import ReactDOM from 'react-dom';

import Message from './Message';

class MessageList extends React.Component {

	componentWillUpdate(){
		const node = ReactDOM.findDOMNode(this);
		this.shouldScrollBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
	}

	componentDidUpdate(){
		//scroll all the way bottom if enough message
		if(this.shouldScrollBottom){
			const node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight;
		}
	}

	render() {
		if(!this.props.roomId){
			return (
				<div className="message-list">
	      	<div className="join-room">
						Please Join A Room
					</div>
				</div>
			);
		}
		return (
			<div className="message-list">
      	{this.props.messages.map((message, index) => {
					return(
						<Message key={index} username={message.senderId} text = {message.parts[0].payload.content}/>
					);
				})}
			</div>
		);
	}
}
export default MessageList;
