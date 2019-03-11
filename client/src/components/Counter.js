import React, { Component } from 'react';
import Chart from 'chart.js';

class Counter extends Component {
	state = {
		data: [],
		id: 0,
		intervalIsSet: false
	}

	componentDidMount() {
		this.getDataFromDb();
		if (!this.state.intervalIsSet) {
			let interval = setInterval(this.getDataFromDb, 1000);
			this.setState({ intervalIsSet: interval });
		}
	}

	componentWillUnmount() {
		if (this.state.intervalIsSet) {
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
		}
	}

	getDataFromDb = () => {
		fetch(window.location.protocol + "//" + window.location.hostname + ":3001/api/getData")
		.then(data => data.json())
		.then(res => this.setState({ data: res.data }));
	};

	render() {
		const { data } = this.state;

		return (
			<div className="Counter">
				<div className="Content">
					{data.length <= 0
					? "NO DB ENTRIES YET"
					: sessionStorage.getItem('username')
					? <div>
						<code>Counter: {parseInt(data[data.length - 1].id) + 1}</code>
					</div>
					: <code>Please Log-in</code>
					}
				</div>
			</div>
		);
	}
}

export default Counter;