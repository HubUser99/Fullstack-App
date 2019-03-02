import React, { Component } from 'react';
import Link from "react-router-dom/Link";

class Menu extends Component {
	render() {
		return (
			<div className="Menu">
				<Link to="/"><code>Home</code></Link>
				<Link to="/auth"><code>Auth</code></Link>
			</div>
		);
	}
}

export default Menu;