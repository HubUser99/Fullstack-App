import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		height: 'calc(100vh - 20px)',
	},
	content: {
		paddingTop: '200px',
		textAlign: 'center',
	},
});

class Profile extends Component {
	render() {
		return (
			<div className={this.props.classes.root}>
				<div className={this.props.classes.content}>
					<h1><code>Welcome, {sessionStorage.getItem('username')}</code></h1>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Profile);