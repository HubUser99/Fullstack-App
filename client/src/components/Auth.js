import React, { Component } from 'react';
import Login from './Login.js';
import Signup from './Signup.js';

import axios from "axios";
import history from '../tools/history.js';
import { getDataFromDb, authorize, putDataToDB } from './api.js';

class Auth extends Component {

	constructor(props) {
		super(props);

		this.state = {
			login: true,
			lastUser: {},
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

	toggleLogin = () => {
		this.setState({
			login: !this.state.login
		});
	}

	render() {
		const { lastUser } = this.state;
		return (
			<div className="Auth">
				<div className="Content">
					<ul>
						{lastUser.id < 0
						? "NO DB ENTRIES YET"
						: "Last registered user: " + lastUser.username
						}
					</ul>
					{sessionStorage.getItem('session_id')
					? "Hello " + sessionStorage.getItem('username')
					: <div>
						{(this.state.login)
						? <Login
						authorize={ authorize }
						/>
						: <Signup
						lastUser={ this.state.lastUser }
						putDataToDB={ putDataToDB }
						/>
						}
						<button onClick={this.toggleLogin}>
						{ (this.state.login) ? "want to Signup?" : "want to Login?" }
						</button>
					</div>
					}
				</div>
			</div>
		);
	}
}

export default Auth;