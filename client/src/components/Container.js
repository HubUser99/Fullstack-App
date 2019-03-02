import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './Home.js';
import Auth from './Auth.js';

class Container extends Component {
	render() {
		return (
			<div className="Container">
				<Switch>
					<Route exact path="/" component={ Home } />
					<Route path="/auth" component={ Auth } />
				</Switch>
			</div>
		);
	}
}



export default Container;