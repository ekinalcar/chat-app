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
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms : []
		};
	}

	componentDidMount() {
		chatManager.connect().then(currentUser => {
			this.currentUser = currentUser;
			this.getRooms();
		}).catch(error => {
			console.error('error:', error);
		});
	}

	subscribeToRoom = (roomId) => {
		this.setState({messages:[]});
		this.currentUser.subscribeToRoomMultipart({
			roomId: roomId,
			hooks: {
				onMessage: message => {
					this.setState({
						messages:[...this.state.messages,message],
					});
				}
			}
		}).then(room =>{
			this.setState({
				roomId: room.id,
			});
			this.getRooms();
		}).catch(error => {
			console.error('error joining room:', error);
		});
	}

	getRooms = () => {
		this.currentUser.getJoinableRooms().then(joinableRooms => {
			this.setState({
				joinableRooms,
				joinedRooms: this.currentUser.rooms,
			});
		}).catch(error => {
			console.error('error:', error);
		});
	}

	sendMessage = (text) => {
		this.currentUser.sendMessage({
			text:text,
			roomId: this.state.roomId,
		});
	}

	createRoom = (roomName) => {
		this.currentUser.createRoom({
			name:roomName
		}).then(room => {
			this.subscribeToRoom(room.id);
		}).catch(error => {
			console.error('error with create room:', error);
		});
	}

	render() {
		return (
			<div className="app">
				<RoomList subscribeToRoom = {this.subscribeToRoom} roomId = {this.state.roomId} rooms = {[...this.state.joinedRooms,...this.state.joinableRooms]} />
				<MessageList roomId={this.state.roomId} messages = {this.state.messages} />
				<SendMessageForm disabled = {!this.state.roomId} sendMessage = {this.sendMessage}/>
				<NewRoomForm createRoom = {this.createRoom}/>
			</div>
		);
	}
}

export default App;
