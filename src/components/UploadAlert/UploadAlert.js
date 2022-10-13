import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./UploadAlert.css";
const UploadAlert = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    let timeout;
    if (props.message) {
      setShowMessage(true);
      timeout = setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [props.message]);
  let alertClassNameArray = ["gs_task_upload_alert"];
  if (showMessage) {
    alertClassNameArray.push("gs_task_upload_alert-alert--on");
  }
  return (
    <div className={alertClassNameArray.join(" ")}>
      <div className={"gs_task_upload_alert-alert " + props.type}>
        {props.message}
      </div>
    </div>
  );
};
UploadAlert.Type = {
  success: "success",
  error: "error",
};
UploadAlert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOfType(Object.keys(UploadAlert.Type)),
};

export default UploadAlert;
