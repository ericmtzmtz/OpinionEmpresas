import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ listItem, deleteListItem }) => {
	if(Array.isArray(listItem)){
		return (
			<div className='col-12 mb-5'>
				<div className="card text-left">
					<div className="card-header">
						<p className="text-rigth card-title">{listItem[0].title}</p>
						<div className="btn bg-danger" style={{
							'marginRight': '2px',
							'marginTop': '-45px',
							'position': 'absolute',
							'right':'0' 
							}}>
							<button
								type="button"
								className="close py-2 text-white"
								data-dismiss="alert"
								aria-label="Close-white"
								onClick={() => deleteListItem(listItem[0])}
							>
								<div aria-hidden="true">&times;</div>
							</button>
						</div>
					</div>
					<div className="card-body">
						<h5 className="card-title">Comentarios de:
							<b className="text-uppercase">{listItem[0].userName}</b>
						</h5>
						<p className="card-text">{listItem[0].resume}</p>
						
					</div>
					<div className="card-footer text-muted">
						{localStorage.getItem('isStaff') === 'true'?
							<p className="mt-3 text-right d-block">IP: <b>{listItem[0].ip}</b></p>
						:''}
							<p className="text-left d-block">
								Fecha de creacion: {listItem[0].publish_date}
							</p>
					</div>
				</div>
			</div>
	  );
	}else{
		return (
			<div className='col-12 mb-5'>
				<div className="card text-left">
					<div className="card-header">
						<p className="text-rigth card-title">{listItem.title}</p>
						<div className="btn bg-danger" style={{
							'marginRight': '2px',
							'marginTop': '-45px',
							'position': 'absolute',
							'right':'0' 
							}}>
							<button
								type="button"
								className="close py-2 text-white"
								data-dismiss="alert"
								aria-label="Close-white"
								onClick={() => deleteListItem(listItem)}
							>
								<div aria-hidden="true">&times;</div>
							</button>
						</div>
					</div>
					<div className="card-body">
						<h5 className="card-title">Comentarios de:
							<b className="text-uppercase">{listItem.userName}</b>
						</h5>
						<p className="card-text">{listItem.resume}</p>
						
					</div>
					<div className="card-footer text-muted">
						{localStorage.getItem('isStaff') === 'true'?
							<p className="mt-3 text-right d-block">IP: <b>{listItem.ip}</b></p>
						:''}
							<p className="text-left d-block">
								Fecha de creacion: {listItem.publish_date}
							</p>
					</div>
				</div>
			</div>
	  );
	}
}

ListItem.propTypes = {
  listItem: PropTypes.any,
  deleteListItem: PropTypes.func
}

export default ListItem;