import React from "react";
import PropTypes from "prop-types";
import "./UploadInput.css";

const UploadInput = (props) => {
  return (
    <form className="gs_task_upload_input">
      <label htmlFor="fileInput">Drag and drop here / Click to load</label>
      <input
        className="gs_task_upload_input-input"
        id="fileInput"
        onChange={props.onChangehandler}
        type="file"
        accept=".pdf"
      />
    </form>
  );
};

UploadInput.propTypes = {
  changehandler: PropTypes.func,
};

export default UploadInput;
