import React, { Component } from 'react';

class Login extends Component {
	state = {
		username: null,
		password: null
	}

	componentDidMount(){
		this.nameInput.focus();
	}

	render() {
		return (
			<div>
				<div style={{ padding: "10px" }} >
					<form autoComplete="on">
						<input
						ref={(input) => { this.nameInput = input; }}
						type="text"
						autoComplete="username email"
						onChange={e => this.setState({ username: e.target.value })}
						placeholder="username"
						style={{ width: "200px" }}
						autofocus
						/>
						<br/>
						<input
						type="password"
						autoComplete="password"
						onChange={e => this.setState({ password: e.target.value })}
						placeholder="password"
						style={{ width: "200px" }}
						/>
						<br/>
						<button onClick={(e) => this.props.authorize(this.state.username, this.state.password, e)}>
						LogIn
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;