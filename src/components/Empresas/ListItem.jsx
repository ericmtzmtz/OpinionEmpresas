import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ listItem, deleteListItem }) => {
  return (
    <div className="col-12 mb-3 border">
		<div className="row bg-primary text-white">
			<div className="col-11">
				<p className="mt-3">{listItem.name}</p>
			</div>
			<div className="col-1">
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
      <div className="row">
        <div className="col-12">
          <p className="mt-3">{listItem.resume}</p>
        </div>
      </div>
	  <div className="row">
			<div className="col-12">
				<p className="mt-3">{listItem.added_by.$oid}</p>
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