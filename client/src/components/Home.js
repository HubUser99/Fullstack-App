import React, { Component } from 'react';

import Counter from './Counter.js';

class Home extends Component {
	state = {
		authorized: false
	};

	render() {
		return (
			<div className="Home">
				<div className="Content">
					<div className="WelcomeText">
						<sub><h3>Welcome to </h3></sub><code><h1>usercount</h1></code> <br/>
					</div>
					<div className="Description">
						<blockquote id="bc-1">
							Usercount is a service which main function is to count how many users have
							registered to it.
						</blockquote>
						<blockquote id="bc-2">
							Counter of registered users you can see below.
						</blockquote>
						<blockquote id="bc-3">
							Register yourself and make impact on the counter!
						</blockquote>
					</div>
				</div>
				<Counter />
			</div>
		);
	}
}

export default Home;