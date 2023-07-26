import React from "react";

function Alert(props) {
    const { message, type } = props;
    const alertClass =
        type === "success" ? "alert-success" : type === "warning" ? "alert-warning" : "alert-danger";
    return (
        <div className={`alert ${alertClass}`} role="alert">
            {message}
        </div>
    );
}

export default Alert;
