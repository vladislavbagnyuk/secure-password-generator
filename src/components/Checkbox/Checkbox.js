import React from "react";
import classes from "./Checkbox.module.css";

const checkbox = (props) => (
  <div className={classes.Checkbox}>
    <input
      type="checkbox"
      id={props.value}
      value={props.value}
      checked={props.checked}
    ></input>
    <label for={props.value}>{props.label}</label>
  </div>
);

export default checkbox;
