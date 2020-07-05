import React, { useState } from 'react';
import ListItem from './ListItem';
import OpinionForm from './OpinionForm';
import CONSTANTS from '../../constants';
import AlertMessage from '../Messages';
import axios from 'axios';

const token = 'Bearer ' + localStorage.getItem('token');

const Opinion = () => {
	const [ listItems, setListItems ] = useState([]);
	const [ alertMessage, setAlertMessage ] = useState({
		messageOpen: false,
		type: '',
		messageText: ''
	});
	const [ selects, setSelects ] = useState({
		empresas: [],
		puntuaciones: []
	});

	const getOpinions = () => {
		let promiseList = axios({
			method: 'GET',
			url: CONSTANTS.ENDPOINT.LIST + '/api/opiniones',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: token
			}
		}).then((response) => {
			if (response.statusText !== 'OK') {
				throw Error(response.statusText);
			}
			if (response.data.length < 2) {
				setSelects({
					empresas: response.data[0].data2.empresas,
					puntuaciones: response.data[0].data2.puntuaciones
				});
			} else {
				setAlertMessage({
					messageOpen: true,
					type: 'alert-danger',
					messageText: 'Aun no hay empresas'
				});
			}
			if (response.data[0].data !== undefined) {
				const respuesta = [];
				respuesta.push(response.data[0].data);
				return respuesta;
			} else {
				return '';
			}
		});
		return promiseList;
	};

	const postOpinion = (params) => {
		if (params.name === '' || params.points === '' || params.empresa === '') {
			console.log('Formulario Vacio');
			setAlertMessage({
				messageOpen: true,
				messageText: 'Por favor rellene los datos',
				type: 'alert-warning'
			});
		} else {
			const options = {
				url: CONSTANTS.ENDPOINT.LIST + '/api/opiniones',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: token
				},
				data: {
					title: params.name,
					resume: params.resume,
					points: params.points,
					empresa: params.empresa
				}
			};
			axios(options)
				.then((response) => {
					if (response.statusText !== 'OK') {
						throw Error(response.statusText);
					}
					setAlertMessage({
						messageOpen: true,
						type: 'alert-success',
						messageText: response.data.message
					});
					axios({
						method: 'GET',
						url: CONSTANTS.ENDPOINT.LIST + '/api/opiniones/' + response.data.id,
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json;charset=UTF-8',
							Authorization: token
						}
					})
						.then((response2) => {
							console.log(response2.data);
							const respuesta = [];
							respuesta.push(response2.data);
							console.log(respuesta);
							setListItems([ respuesta, ...listItems ]);
						})
						.catch((error) => {
							console.log('qeui error');
							setAlertMessage({
								messageOpen: true,
								type: 'alert-warning',
								messageText: error.message
							});
						});
				})
				.catch((error) => {
					setAlertMessage({
						messageOpen: true,
						type: 'alert-warning',
						messageText: error.response.data.message
					});
				});
		}
	};

	const deleteOpinion = (listItem) => {
		console.log('Eliminado :V');
		const options = {
			url: CONSTANTS.ENDPOINT.LIST + '/api/opiniones/' + listItem._id,
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: token
			}
		};
		axios(options)
			.then((response) => {
				if (response.statusText !== 'OK') {
					throw Error(response.statusText);
				}
				console.log(response);
				setAlertMessage({
					messageOpen: true,
					type: 'alert-success',
					messageText: 'Delete Successful'
				});
				axios({
					method: 'GET',
					url: CONSTANTS.ENDPOINT.LIST + '/api/opiniones',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: token
					}
				}).then((response2) => {
					// if(response.data.length<2){
					// 	setSelects({
					// 		empresas: response.data[0].data2.empresas,
					// 		puntuaciones: response.data[0].data2.puntuaciones
					// 	})
					// }else{
					// 	setAlertMessage({
					// 		messageOpen: true,
					// 		type: 'alert-danger',
					// 		messageText: 'Aun no hay empresas'
					// 	})
					// }
					if (response2.data[0].data !== undefined) {
						const respuesta = [];
						respuesta.push(response.data[0].data);
						setListItems(respuesta);
					} else {
						setListItems('');
					}
				});
			})
			.catch((error) => {
				setAlertMessage({
					messageOpen: true,
					type: 'alert-danger',
					messageText: error.message
				});
			});
	};

	const handleMessageClose = () => {
		setAlertMessage({
			messageOpen: false,
			type: '',
			messageText: ''
		});
	};

	React.useEffect(() => {
		getOpinions()
			.then((list) => {
				setListItems(list);
			})
			.catch((error) =>
				setAlertMessage({
					messageOpen: true,
					type: 'alert-danger',
					messageText: error.message
				})
			);
	}, []);
	console.log(listItems);

	return (
		<main id="mainContent" className="container">
			<div className="row">
				<div className="col mt-5 p-0">
					<h3>Crear una opinion</h3>
				</div>
				<div className="col-12 p-0">
					<OpinionForm addListItem={postOpinion} selects={selects} />
				</div>
				{listItems !== undefined && listItems.length > 0 ? (
					listItems.map((listItem, index) => (
						<ListItem key={index} listItem={listItem} deleteListItem={deleteOpinion} />
					))
				) : (
					'Aun no hay opiniones'
				)}
				<AlertMessage
					open={alertMessage.messageOpen}
					type={alertMessage.type}
					text={alertMessage.messageText}
					onWarningClose={handleMessageClose}
				/>
			</div>
		</main>
	);
};

export default Opinion;
