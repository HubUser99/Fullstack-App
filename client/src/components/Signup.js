import React, { Component } from 'react';

class Signup extends Component {
	state = {
		username: null,
		password: null
	}

	render() {
		return (
			<div>
				<div style={{ padding: "10px" }}>
					<input
					type="text"
					onChange={e => this.setState({ username: e.target.value })}
					placeholder="username"
					style={{ width: "200px" }}
					/>
					<input
					type="text"
					onChange={e => this.setState({ password: e.target.value })}
					placeholder="password"
					style={{ width: "200px" }}
					/>
					<button onClick={() => this.props.putDataToDB(this.state.username, this.state.password)}>
						SignUp
					</button>
				</div>
			</div>
		);
	}
}

export default Signup;