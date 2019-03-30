import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import history from '../tools/history.js';
import { withStyles } from '@material-ui/core/styles';
import { deauthorize } from './api.js';

const styles = theme => ({
	root: {
		backgroundColor: 'black',
		position: 'fixed',
	},
});

class Menu extends Component {
	logout = () => {
		deauthorize(sessionStorage.getItem('username'), sessionStorage.getItem('session_id'));
		sessionStorage.removeItem('session_id');
		sessionStorage.removeItem('username');
		this.forceUpdate();
		history.push('/auth');
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<Link to="/"><code>Home</code></Link>
				{sessionStorage.getItem('session_id')
				? <div>
					<Link to="/profile"><code>Profile</code></Link><br/>
					<a style={{cursor: 'pointer'}} onClick={ this.logout }><code>Logout</code></a>
				</div>
				: <Link to="/auth"><code>Auth</code></Link>
				}
			</div>
		);
	}
}

export default withStyles(styles)(Menu);