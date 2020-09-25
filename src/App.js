import React, { Component } from "react";
import cryptoRandomString from "crypto-random-string";
import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import Button from "./components/Button/Button";
import Checkbox from "./components/Checkbox/Checkbox";
import classes from "./App.module.css";

class App extends Component {
  state = {
    password: "",
    checkboxes: [
      { label: "Letters", value: "letters", checked: true },
      { label: "Numbers", value: "numbers", checked: true },
      { label: "Symbols", value: "letters", checked: true },
    ],
  };

  componentDidMount() {
    this.generatePassword();
  }

  generatePassword = () => {
    const password = cryptoRandomString({
      length: 15,
      type: "ascii-printable",
    });
    this.setState({
      password: password,
    });
  };

  copyToClipboard = () => {
    copy(this.state.password);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.generatePassword();
  };

  render() {
    return (
      <div className={classes.App}>
        <h1>Generate secure password</h1>
        <p className={classes.Password}>{this.state.password}</p>
        <form onSubmit={this.onFormSubmit}>
          {this.state.checkboxes.map((checkbox) => (
            <Checkbox
              key={checkbox.value}
              value={checkbox.value}
              label={checkbox.label}
              checked={checkbox.checked}
            />
          ))}
          <Button type="button" btnType="link" clicked={this.copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} /> Copy to clipboard
          </Button>
          <Button type="submit" clicked={this.generatePassword}>
            Generate
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
