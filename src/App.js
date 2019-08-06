import React from 'react';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import {chatManager} from './config';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			messages: [],
			joinableRooms: [],
			joinedRooms : []
		};

		this.sendMessage = this.sendMessage.bind(this);
	}

	componentDidMount() {
		chatManager.connect().then(currentUser => {
			this.currentUser = currentUser;

			this.currentUser.getJoinableRooms().then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms,
				});
			}).catch(error => {
				console.error('error:', error);
			});

			this.currentUser.subscribeToRoomMultipart({
				roomId: '21d55495-4cd0-4dcd-844c-0ffe07360950',// currentUser.rooms[0].id,
				hooks: {
					onMessage: message => {
						this.setState({
							messages:[...this.state.messages,message],
						});
					}
				}
			});
		}).catch(error => {
			console.error('error:', error);
		});
	}

	sendMessage(text){
		this.currentUser.sendMessage({
			text:text,
			roomId: '21d55495-4cd0-4dcd-844c-0ffe07360950'
		});
	}

	render() {
		return (
			<div className="app">
				<RoomList rooms = {[...this.state.joinedRooms,...this.state.joinableRooms]} />
				<MessageList messages = {this.state.messages} />
				<SendMessageForm sendMessage = {this.sendMessage}/>
				<NewRoomForm/>
			</div>
		);
	}
}

export default App;
