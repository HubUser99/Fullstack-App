import axios from 'axios';

export function deauthorize (username, session_id) {
	axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/logout", {
		username: username,
		session_id: session_id
	})
	.then((response) => {
		alert(response.data);
	})
	.catch((error) => {
		console.log(error);
	})
}

export function getDataFromDb () {
	fetch(window.location.protocol + "//" + window.location.hostname + ":3001/api/getData")
	.then(data => data.json())
	.then(res => {return res.data;});
};

export function putDataToDB (email, username, password) {
	let currentIds = this.state.data.map(data => data.id);
	let idToBeAdded = 0;
	while (currentIds.includes(idToBeAdded)) {
		++idToBeAdded;
	}

	axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/putData", {
		id: idToBeAdded,
		email: email,
		username: username,
		password: password
	})
	.then((response) => {
		alert(response.data);
	})
};

export function authorize (username, password, e) {
	e.preventDefault();

	axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/validate", {
		username: username,
		password: password
	})
	.then((response) => {
		const valid = response.data.valid;
		const username = response.data.username;
		const session_id = response.data.session_id;
		console.log(session_id);

		if (valid) {
			this.setSession(username, session_id);
			//history.push('/');
		} else {
			alert(response.data.error);
		}
	})
	.catch((error) => {
		console.log(error);
	})
}