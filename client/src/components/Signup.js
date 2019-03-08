import React, { Component } from 'react';

class Signup extends Component {
	state = {
		email: null,
		username: null,
		password: null,
		rep_password: null
	}

	signup = (e) => {
		e.preventDefault();

		if (this.state.password === this.state.rep_password) {
			this.props.putDataToDB(this.state.email ,this.state.username, this.state.password)
		} else {
			alert("repeat password correctly");
		}
	}

	render() {
		return (
			<div>
				<form autoComplete="on">
					<div style={{ padding: "10px" }}>
						<input
							type="email"
							onChange={e => this.setState({ email: e.target.value })}
							placeholder="email"
							style={{ width: "200px" }}
						/>
						<br/>
						<input
							type="text"
							onChange={e => this.setState({ username: e.target.value })}
							placeholder="username"
							style={{ width: "200px" }}
						/>
						<br/>
						<input
							type="password"
							autoComplete="new-password"
							onChange={e => this.setState({ password: e.target.value })}
							placeholder="password"
							style={{ width: "200px" }}
						/>
						<br/>
						<input
							type="password"
							autoComplete="new-password"
							onChange={e => this.setState({ rep_password: e.target.value })}
							placeholder="repeat password"
							style={{ width: "200px" }}
						/>
						<br/>
						<button type="button" onClick={(e) => this.signup(e)}>
							SignUp
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;