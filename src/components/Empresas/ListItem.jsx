import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ listItem, deleteListItem }) => {
  return (
    <div className="col-12 mb-5">
		<div className="card text-left">
			<div className="card-header">
				<p className="text-left card-title">
					{listItem.name}
				</p>
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
				<h5 className="card-title">Resumen:</h5>
				<p className="card-text">
					{listItem.resume}
				</p>
      		</div>
	  		<div className="card-footer text-muted">
				{localStorage.getItem('isStaff') === "true" ? (
					<p className="mt-3">Agregado por {listItem.nameUser}</p>
				) : ''}
			</div>
		</div>
    </div>
  );
}

ListItem.propTypes = {
  listItem: PropTypes.any,
  deleteListItem: PropTypes.func
}

export default ListItem;