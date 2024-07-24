import React from "react";

const Alert = ({ alert, classname }) => {
  const { message, type } = alert;
  return (
    <div className={`alert alert-${type} ${classname}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;
