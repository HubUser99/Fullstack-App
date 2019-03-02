import React, { Component } from 'react';

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
		fetch("http://localhost:3001/api/getData")
		.then(data => data.json())
		.then(res => this.setState({ data: res.data }));
	};

	render() {
		const { data } = this.state;
		return (
			<div className="Counter">
				<div className="Content">
					<code>
						{data.length <= 0
							? "NO DB ENTRIES YET"
							: "Counter: " + (parseInt(data[data.length - 1].id) + 1)
						}
					</code>
				</div>
			</div>
			);
	}
}

export default Counter;