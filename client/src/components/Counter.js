import React, { Component } from 'react';
import { getDataFromDb } from './api.js';

class Counter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lastUser: {},
			id: 0,
			intervalIsSet: false
		};

		this.updateState = this.updateState.bind(this);
	}

	componentWillMount() {
		this.updateState();
		if (!this.state.intervalIsSet) {
			let interval = setInterval(this.updateState, 1000);
			this.setState({ intervalIsSet: interval });
		}
	}

	componentWillUnmount() {
		if (this.state.intervalIsSet) {
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
		}
	}

	updateState() {
		getDataFromDb(this);
	}

	render() {
		const { lastUser } = this.state;

		return (
			<div className="Counter">
				<div className="Content">
					{lastUser.length <= 0
					? "NO DB ENTRIES YET"
					: sessionStorage.getItem('username')
					? <div>
						<code>Counter: {parseInt(lastUser.id) + 1}</code>
					</div>
					: <code>Please Log-in</code>
					}
				</div>
			</div>
		);
	}
}

export default Counter;