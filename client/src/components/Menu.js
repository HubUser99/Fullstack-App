import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import history from '../tools/history.js';

class Menu extends Component {
	logout = () => {
		sessionStorage.removeItem('username');
		sessionStorage.removeItem('valid');
		this.forceUpdate();
		history.push('/auth');
	}

	render() {
		return (
			<div className="Menu">
				<Link to="/"><code>Home</code></Link>
				{sessionStorage.getItem('username')
					? <div>
						<Link to="/profile"><code>Profile</code></Link><br/>
						<a style={{cursor: 'pointer'}} onClick={ this.logout }><code>logout</code></a>
					  </div>
					: <Link to="/auth"><code>Auth</code></Link>
				}
			</div>
		);
	}
}

export default Menu;