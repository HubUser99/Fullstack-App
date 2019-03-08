import React, { Component } from 'react';
import Login from './Login.js';
import Signup from './Signup.js';

import axios from "axios";
import history from '../tools/history.js';

class Auth extends Component {

	state = {
		login: false,
		valid: false,
		data: [],
		id: 0,
		intervalIsSet: false
	};

	componentDidMount() {
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
		fetch(window.location.protocol + "//" + window.location.hostname + ":3001/api/getData")
		.then(data => data.json())
		.then(res => this.setState({ data: res.data }));
	};

	putDataToDB = (username, password) => {
		let currentIds = this.state.data.map(data => data.id);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded)) {
			++idToBeAdded;
		}

		axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/putData", {
			id: idToBeAdded,
			username: username,
			password: password
		})
		.then((response) => {
			if (response.data.success) {
				this.setSession(username);
				history.push('/');
			}
		})
	};

	/*validate = (hash, password, username) => {
		axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/validate", {
			hash: hash,
			password: password
		})
		.then((response) => {
			this.setState({
				valid: response.data.data
			});

			if (this.state.valid) {
				this.setSession(username);
				history.push('/');
			} else {
				console.log("no");
			}
		})
		.catch(function (error) {
			console.log(error);
		})
	}*/

	authorize = async (username, password) => {
		axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/validate", {
			username: username,
			password: password
		})
		.then((response) => {
			this.setState({
				valid: response.data.valid
			});

			if (this.state.valid) {
				this.setSession(username);
				history.push('/');
			} else {
				console.log("no");
			}
		})
		.catch(function (error) {
			console.log(error);
		})

		/*const users = this.state.data.map(x => x.username);
		const hashes = this.state.data.map(x => x.password);
		if (users.includes(username)) {
			const hash = hashes[users.indexOf(username)];
			this.validate(hash, password, username);
		} else {
			this.putDataToDB(username, password);
			sessionStorage.setItem('username', username);
			history.push('/');
		}*/

	}

	setSession = (username) => {
		sessionStorage.setItem('username', username);
	}

	toggleLogin = () => {
		this.setState({
			login: !this.state.login
		});
	}

	render() {
		const { data } = this.state;
		return (
			<div className="Auth">
				<div className="Content">
					<ul>
						{data.length <= 0
							? "NO DB ENTRIES YET"
							: "Last registered user: " + data[data.length - 1].username
						}
					</ul>
					{sessionStorage.getItem('username') 
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