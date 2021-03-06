﻿import React, { useState } from "react";
import ListItem from "./ListItem";
import EmpresasForm from "./EmpresasForm";
import CONSTANTS from "../../constants";
import axios from 'axios'
import AlertMessage from "../Messages";

const token = 'Bearer ' + localStorage.getItem('token')

const Empresa = () => {
	const [listItems, setListItems] = useState([]);
	const [alertMessage, setAlertMessage] = useState({messageOpen: false, type: "", messageText: ""})
	
	const getEmpresas = () =>{
		let promiseList = axios({
			method:'GET',
			url: CONSTANTS.ENDPOINT.LIST + '/api/empresas',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': token
			}}).then(response => {
	  		if(response.statusText !== 'OK'){
		  		throw Error(response.statusText)
	  		}
		  	return response.data	
  		})
		return promiseList
  	}

	const postEmpresas = (nameEmpresa, resumeEmpresa) => {
		// Popup si el usuario envia un form vacio
		if(!nameEmpresa){
			setAlertMessage({
				messageOpen: true,
				type: 'alert-warning',
				messageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
			})
			return
		}
		const options = {
			url: CONSTANTS.ENDPOINT.LIST + '/api/empresas',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': token
			},
			data: {
				"name": nameEmpresa,
				"resume": resumeEmpresa
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
			axios({
				method:'GET',
				url: CONSTANTS.ENDPOINT.LIST + '/api/empresas/' + response.data.id,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					'Authorization': token
				}}).then(response2 =>{
					console.log(response2)
				setListItems([response2.data, ...listItems])
			})
		})
		.catch(error => { 
			setAlertMessage({
				messageOpen: true,
				type: 'alert-warning',
				messageText: error.response.data.message
			})
		})
	}  

	const deleteEmpresa = (listItem) => {
		const options = {
			url: CONSTANTS.ENDPOINT.LIST + '/api/empresas/' + listItem._id,
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': token
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
			axios({
				method:'GET',
				url: CONSTANTS.ENDPOINT.LIST + '/api/empresas',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					'Authorization': token
				}}).then(response2 =>{
				setListItems(response2.data)
			})
		})
		.catch(error => { 
			setAlertMessage({
				messageOpen: true,
				type: 'alert-danger',
				messageText: error.response.data.message
			})
		})
	}

  	const handleMessageClose = () => {
		setAlertMessage({
			messageOpen: false,
			type: "",
			messageText: ""
		});
  	};

  	React.useEffect(() => {
		getEmpresas()
	  	.then(list => {setListItems(list)})
	  	.catch(error =>
			setAlertMessage({
				messageOpen: true,
				type: 'alert-warning',
				messageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
			})
	  	);
  	}, []);
	console.log(listItems)
	 
  	return (
		<main id="mainContent" className="container">
	  		<div className="row">
				<div className="col mt-5 p-0">
		  			<h3>Agregar Empresas</h3>
				</div>
				<div className="col-12 p-0">
					<EmpresasForm addListItem={postEmpresas}/>
				</div>
				{listItems.map((listItem, index) => (
					listItem !== undefined ?
						<ListItem
							key={index}
							listItem={listItem}
							deleteListItem={deleteEmpresa}
						/> :'Aun no hay empresas'
					
				))}
				<AlertMessage
					open={alertMessage.messageOpen}
					type={alertMessage.type}
					text={alertMessage.messageText}
					onWarningClose={handleMessageClose}
				/>
	  		</div>
		</main>
  	);
}

export default Empresa;