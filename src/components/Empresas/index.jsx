import React, { useState } from "react";
import ListItem from "./ListItem";
import EmpresasForm from "./EmpresasForm";
import CONSTANTS from "../../constants";
import axios from 'axios'
import AlertMessage from "../Messages";


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
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM0MzI3MDIsIm5iZiI6MTU4MzQzMjcwMiwianRpIjoiYTllOTQ4MmEtOTVkOS00N2NmLTliZWQtNmJmNTRkMmY0MjEzIiwiZXhwIjoxNTg0MDM3NTAyLCJpZGVudGl0eSI6IjVlNjE0M2M4MzdjZjgwY2MxZmQ0N2FiMiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.UenSRYYODmWT6qeDPu_VqxnKSWQWhNduEKkw4VK82ps'
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
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM0MzI3MDIsIm5iZiI6MTU4MzQzMjcwMiwianRpIjoiYTllOTQ4MmEtOTVkOS00N2NmLTliZWQtNmJmNTRkMmY0MjEzIiwiZXhwIjoxNTg0MDM3NTAyLCJpZGVudGl0eSI6IjVlNjE0M2M4MzdjZjgwY2MxZmQ0N2FiMiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.UenSRYYODmWT6qeDPu_VqxnKSWQWhNduEKkw4VK82ps'
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
			axios.get(CONSTANTS.ENDPOINT.LIST + '/api/empresas/' + response.data.id).then(response2 =>{
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
			url: CONSTANTS.ENDPOINT.LIST + '/api/empresas/' + listItem._id.$oid,
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM0MzI3MDIsIm5iZiI6MTU4MzQzMjcwMiwianRpIjoiYTllOTQ4MmEtOTVkOS00N2NmLTliZWQtNmJmNTRkMmY0MjEzIiwiZXhwIjoxNTg0MDM3NTAyLCJpZGVudGl0eSI6IjVlNjE0M2M4MzdjZjgwY2MxZmQ0N2FiMiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.UenSRYYODmWT6qeDPu_VqxnKSWQWhNduEKkw4VK82ps'
			}
		}
		axios(options).then(response => {
			if(response.statusText !== 'OK'){
				throw Error(response.statusText)
			}
			console.log(response.data)
			setAlertMessage({
				messageOpen: true,
				type: 'alert-success',
				messageText: response.data.message
			})
			axios.get(CONSTANTS.ENDPOINT.LIST + '/api/empresas').then(response2 =>{
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
						/> :''
					
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