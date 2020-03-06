import React from "react";
import classnames from "classnames";
import styles from "./warningmessage.module.css";
import PropTypes from "prop-types";

// A pop up message used to warn users about failed API calls to the back end
const AlertMessage = ({ open, type, text, onWarningClose }) => {
  return (
    <React.Fragment>
      {open && (
        <div
          className={classnames(
            "alert",
            type,
            "ml-3",
            styles.warningPosition
          )}
          role="alert"
        >
          {text}
          <button
            onClick={onWarningClose}
            className="close ml-2"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

AlertMessage.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
  onWarningClose:PropTypes.func
}

export default AlertMessage;