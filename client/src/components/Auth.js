import React, { Component } from 'react';
import Login from './Login.js';
import Signup from './Signup.js';

import axios from "axios";
import history from '../tools/history.js';

class Auth extends Component {

	state = {
		login: true,
		lastUser: {},
		id: 0,
		intervalIsSet: false
	};

	componentWillMount() {
		this.getDataFromDb();
		if (!this.state.intervalIsSet) {
			let interval = setInterval(this.getDataFromDb, 1000);
			this.setState({ intervalIsSet: interval });
		}
	}

	componentWillUnmount() {
		if (this.state.intervalIsSet) {
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
		}
	}

	getDataFromDb = () => {
		fetch(window.location.protocol + "//" + window.location.hostname + ":3001/api/getLast")
		.then(data => data.json())
		.then(res => this.setState({ lastUser: {username: res.username, id: res.id} }));
	};

	putDataToDB = (email, username, password) => {
		let lastId = this.state.lastUser.id;
		let idToBeAdded = ++lastId;

		axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/putData", {
			id: idToBeAdded,
			email: email,
			username: username,
			password: password
		})
		.then((response) => {
			alert(response.data);
		})
	};

	authorize = (username, password, e) => {
		e.preventDefault();

		axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/validate", {
			username: username,
			password: password
		})
		.then((response) => {
			const valid = response.data.valid;
			const username = response.data.username;
			const session_id = response.data.session_id;
			console.log(session_id);

			if (valid) {
				this.setSession(username, session_id);
				history.push('/');
			} else {
				alert(response.data.error);
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

	setSession = (username, session_id) => {
		sessionStorage.setItem('session_id', session_id);
		sessionStorage.setItem('username', username);
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
						{lastUser.id <= 0
						? "NO DB ENTRIES YET"
						: "Last registered user: " + lastUser.username
						}
					</ul>
					{sessionStorage.getItem('session_id')
					? "Hello " + sessionStorage.getItem('username')
					: <div>
						{(this.state.login)
						? <Login
						authorize={this.authorize}
						/>
						: <Signup
						putDataToDB={this.putDataToDB}
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