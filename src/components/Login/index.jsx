import React, {useState} from "react";
import CONSTANTS from '../../constants'
import axios from 'axios'
import AlertMessage from "../Messages";



const Login = () => {
	const [getUsername, setUsername] = useState("")
	const [getPassword, setPassword] = useState("")
	const [alertMessage, setAlertMessage] = useState({messageOpen: false, type: "", messageText: ""})

	const handleChangeEmail = (e) => {
		setUsername(e.target.value)
	}
	const handleChangePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const options = {
			url: CONSTANTS.ENDPOINT.LIST + '/api/auth/login',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			data: {
				"email": getUsername,
				"password": getPassword
			}
		}
		axios(options).then(response => {
			if(response.statusText !== 'OK'){
				throw Error(response.statusText)
			}
			setAlertMessage({
				messageOpen: true,
				type: 'alert-success',
				messageText: response.data.message
			})

			localStorage.setItem("token", response.data.token)
			if (localStorage.getItem("token") !== null && localStorage.getItem("token")!=="undefined") {
				window.location.replace("/empresas")
			}else{
				alert(response.data.error);
			}
		})
		.catch(error => {
			setAlertMessage({
				messageOpen: true,
				type: 'alert-danger',
				messageText: error.response.data.error
			})
		})
		setUsername("");
		setPassword("")
	}

	const handleMessageClose = () => {
		setAlertMessage({
			messageOpen: false,
			type: "",
			messageText: ""
		});
  	};
	
	return ( 
		<main id="mainContent" className="inner cover container">
			<h1 className="cover-heading">Cover your page.</h1>
			<p className="lead">
				Cover is a one-page template for building 
				simple and beautiful home pages. 
				Download, edit the text, and add your own 
				fullscreen background photo to make it your own.
			</p>
			<form className="form-signin container" onSubmit={handleSubmit}>
				<img className="mb-4" src="/bootstrap-solid.png" alt="" width="72" height="72"/>
				<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
				<label htmlFor="inputEmail" className="sr-only">Email address</label><br/>
				<input 
					type="email" 
					id="inputEmail" 
					name="email" 
					className="form-control" 
					placeholder="Email address" 
					required autoFocus 
					onChange={handleChangeEmail}
					value={getUsername}
				/>
				<label htmlFor="inputPassword" className="sr-only">Password</label><br/>
				<input 
					type="password" 
					id="inputPassword" 
					name="password" 
					className="form-control" 
					placeholder="Password" 
					required
					onChange={handleChangePassword}
					value={getPassword}
				/>
				<br/>
				<div className="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me"/> Remember me
					</label>
				</div>
				<br/>
				<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				<p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
			</form>
			<AlertMessage
				open={alertMessage.messageOpen}
				type={alertMessage.type}
				text={alertMessage.messageText}
				onWarningClose={handleMessageClose}
			/>
		</main>
  )}
export default Login;
