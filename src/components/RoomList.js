import React from 'react';

class RoomList extends React.Component {
	render () {
		return (
			<div className="rooms-list">
				<ul>
					<h3>Your Chat Rooms </h3>
					{this.props.rooms.map((room, index) => {
						return(
							<li key = {index} className="room">
								<a href="#"># {room.name}</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default RoomList;
