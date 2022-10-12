import React, { useEffect, useState } from "react";
import "./UploadAlert.css";

const UploadAlert = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    setShowMessage(true);
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.message.message]);
  let alertClassNameArray = ["gs_task_upload_alert"];
  if (showMessage) {
    alertClassNameArray.push("gs_task_upload_alert-alert--on");
  }
  return (
    <div className={alertClassNameArray.join(" ")}>
      <div className={"gs_task_upload_alert-alert " + props.message.type}>
        {props.message.message}
      </div>
    </div>
  );
};
UploadAlert.Type = {
  success: "success",
  error: "error",
};
UploadAlert.propTypes = {};

export default UploadAlert;
