import React from "react";
import PropTypes from "prop-types";
import "./RoundButton.css";
const RoundButon = (props) => {
  return (
    <div className="gs_task_round_button" onClick={props.onClick}>
      {props.children}
    </div>
  );
};

RoundButon.propTypes = {
  onClick: PropTypes.func,
};

export default RoundButon;
