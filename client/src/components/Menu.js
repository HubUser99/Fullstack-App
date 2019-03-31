import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import history from '../tools/history.js';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { deauthorize } from './api.js';

const styles = theme => ({
	root: {

	},
	content: {
		position: 'fixed',
		padding: '10px',
		paddingLeft: '20px',
		fontSize: '12pt',
		'@media (max-width: 600px)': {
			fontSize: '13pt'
		}
	},
	item: {
		backgroundColor: 'black',
		margin: '5px',
		borderStyle: 'solid',
		borderWidth: '2px',
		borderColor: '#ff5600',
		borderRadius: '15px',
		WebkitFontSmoothing: 'antialiased',
		transition: 'background-color 0.3s',
		'&:hover': {
			backgroundColor: '#ff5600',
			transition: 'background-color 0.3s',
		},
	}
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
				<Grid container>
					<Grid item xs={2} md={12} className={this.props.classes.content}>
						<Grid container spacing={16} justify="center">
							<Grid item className={this.props.classes.item}>
								<Link to="/"><code>Home</code></Link>
							</Grid>
							{sessionStorage.getItem('session_id')
								? <>
									<Grid item className={this.props.classes.item}>
										<Link to="/profile"><code>Profile</code></Link><br/>
									</Grid>
									<Grid item className={this.props.classes.item}>
										<a style={{cursor: 'pointer'}} onClick={ this.logout }><code>Logout</code></a>
									</Grid>
								</>
								: <Grid item className={this.props.classes.item}>
									<Link to="/auth"><code>Auth</code></Link>
								</Grid>
							}
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Menu);