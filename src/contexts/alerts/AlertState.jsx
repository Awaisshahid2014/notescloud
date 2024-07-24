import React, { useState } from "react";
import AlertContext from "./alertContext";
import Alert from "../../components/Alert";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {alert && (
        <Alert
          alert={alert}
          classname={
            "text-black position-fixed top-0 start-50 translate-middle-x z-3 mt-3 w-25"
          }
        />
      )}
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
