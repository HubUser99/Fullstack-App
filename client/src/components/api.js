import axios from 'axios';
import history from '../tools/history.js';

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

//--------------------------------------------------------
// Modules to be implemented instead of the ones used in Auth.js, Counter.js 

export function getDataFromDb (_this) {
	fetch(window.location.protocol + "//" + window.location.hostname + ":3001/api/getLast")
	.then(data => data.json())
	.then(res => {
		console.log(res);
		_this.setState({
			lastUser: { username: res.username, id: res.id }
		});
	})
	.catch(error => console.log(error));
};

export function putDataToDB (lastUser, email, username, password) {
	let lastId = lastUser.id;
	let idToBeAdded = ++lastId;

	axios.post(window.location.protocol + "//" + window.location.hostname + ":3001/api/putData", {
		id: idToBeAdded,
		email: email,
		username: username,
		password: password
	})
	.then((response) => {
		if (response.data.text) {
			alert(response.data.text);
		} else {
			alert(response.data.error);
		}
	})
	.catch(error => {
		alert(error);
	});
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
			setSession(username, session_id);
			history.push('/');
		} else {
			alert(response.data.error);
		}
	})
	.catch((error) => {
		console.log(error);
	})
}

function setSession (username, session_id) {
	sessionStorage.setItem('session_id', session_id);
	sessionStorage.setItem('username', username);
}