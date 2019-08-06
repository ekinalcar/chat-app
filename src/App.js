import React from 'react';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import {chatManager} from './config';

class App extends React.Component {

	componentDidMount() {
		chatManager.connect().then(currentUser => {
			currentUser.subscribeToRoomMultipart({
				roomId: currentUser.rooms[0].id,
				hooks: {
					onMessage: message => {
            console.log("Received message:", message)
					}
				}
			});
		}).catch(error => {
			console.error('error:', error);
		});
	}

	render() {
		return (
			<div className="app">
				<RoomList/>
				<MessageList/>
				<SendMessageForm/>
				<NewRoomForm/>
			</div>
		);
	}
}

export default App;
