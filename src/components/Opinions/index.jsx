import React, {useState} from 'react'
import ListItem from './ListItem'
// import OpinionForm from './OpinionForm'
import CONSTANTS from '../../constants'
import AlertMessage from '../Messages'
import axios from 'axios'

const token = 'Bearer ' + localStorage.getItem('token')

const Opinion = () => {
	const [listItems, setListItems] = useState([]);
	const [alertMessage, setAlertMessage] = useState({messageOpen: false, type: "", messageText: ""})
	
	const getOpinions = () => {
		let promiseList = axios({
			method: 'GET',
			url: CONSTANTS.ENDPOINT.LIST + '/api/opiniones',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': token
			}}).then(response =>{
				if(response.statusText !== 'OK'){
					throw Error(response.statusText)
				}
				return response.data
			})
		return promiseList
	}

	// const postOpinion = () =>{

	// }

	const deleteOpinion = () => {
		console.log('Eliminado :V')
	}

	const handleMessageClose = () => {
		setAlertMessage({
			messageOpen: false,
			type: "",
			messageText: ""
		});
  	};

	React.useEffect(()=>{
		getOpinions()
		.then(list =>{setListItems(list)})
		.catch(error =>
			setAlertMessage({
				messageOpen: true,
				type: 'alert-danger',
				messageText: error.message
			})
		)
	}, [])
	return(
		<main id="mainContent" className="container">
			<div className="row">
				<div className="col mt-5 p-0">
					<h3>Crear una opinion</h3>
				</div>
				<div className="col-12 p-0">

				</div>
				{listItems.map((listItem, index) => (
					listItem !== undefined ? 
					<ListItem
						key={index}
						listItem={listItem}
						deleteListItem={deleteOpinion}
					/> : ''
				))}
				<AlertMessage
					open={alertMessage.messageOpen}
					type={alertMessage.type}
					text={alertMessage.messageText}
					onWarningClose={handleMessageClose}
				/>
			</div>
		</main>
	)
}

export default Opinion