import React, { useState } from "react";
import ListItem from "./ListItem";
import EmpresasForm from "./EmpresasForm";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";
import axios from 'axios'


const List = () => {
	const [listItems, setListItems] = useState([]);
  	const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});
  	const getEmpresas = () =>{
		let promiseList = axios.get(CONSTANTS.ENDPOINT.LIST + '/api/empresas').then(response => {
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
			setWarningMessage({
				warningMessageOpen: true,
				warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
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
			axios.get(CONSTANTS.ENDPOINT.LIST + '/api/empresas/' + response.data.id).then(response2 =>{
				setListItems([response2.data, ...listItems])
			})
		})
		.catch(error => { 
			setWarningMessage({
				warningMessageOpen: true,
				warningMessageText: error.response.data.message
			})
		})
	}  

  	const deleteListItem = (listItem) => {
		fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
	  	.then(response => {
			if (!response.ok) {
		  	throw Error(response.statusText);
			}
			return response.json();
	  	})
	  	.then(result => {
			setListItems(listItems.filter(item => item._id !== result._id));
	  	})
	  	.catch(error => {
			setWarningMessage({
		  	warningMessageOpen: true,
		  	warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
			});
	  	});
  	}

  	// const addListItem = (nameEmpresa) => {
	// 	// Warning Pop Up if the user submits an empty message
	// 	if (!nameEmpresa) {
	//   	setWarningMessage({
	// 		warningMessageOpen: true,
	// 		warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
	//   	});
	//   	return;
	// 	}

	// 	fetch(CONSTANTS.ENDPOINT.LIST, {
	//   		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({
	// 			text: nameEmpresa
	//   		})
	// 	})
	//   	.then(response => {
	// 		if (!response.ok) {
	// 	  		throw Error(response.statusText);
	// 		}
	// 		return response.json();
	//   	})
	//   	.then(itemAdded =>{
	// 		setListItems([itemAdded, ...listItems]);
	//   	})
	//   	.catch(error =>
	// 		setWarningMessage({
	// 			warningMessageOpen: true,
	// 			warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
	// 		})
	//   	);
  	// };

  	const handleWarningClose = () => {
		setWarningMessage({
			warningMessageOpen: false,
			warningMessageText: ""
		});
  	};

  	React.useEffect(() => {
		getEmpresas()
	  	.then(list => {setListItems(list)})
	  	.catch(error =>
			setWarningMessage({
				warningMessageOpen: true,
				warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
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
					// console.log(listItem),
					listItem !== undefined ?
						<ListItem
							key={index}
							listItem={listItem}
							deleteListItem={deleteListItem}
						/> :''
					
				))}
				<WarningMessage
					open={warningMessage.warningMessageOpen}
					text={warningMessage.warningMessageText}
					onWarningClose={handleWarningClose}
				/>
	  		</div>
		</main>
  	);
}

export default List;