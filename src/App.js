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
    passwordLength: 15,
    checkboxes: [
      { label: "Letters", value: "letters", checked: true },
      { label: "Numbers", value: "numbers", checked: true },
      { label: "Symbols", value: "symbols", checked: true },
    ],
    alert: null,
  };

  componentDidMount() {
    this.generatePassword();
  }

  generatePassword = (
    checkboxes = this.state.checkboxes,
    length = this.state.passwordLength
  ) => {
    if (!length) {
      length = 0;
    }
    length = parseInt(length);
    if (length <= 0) {
      this.setState({
        alert: "Password must be longer than 0",
      });
      return;
    }
    if (length > 1000) {
      this.setState({
        alert: "Do you really need this long password?",
      });
      return;
    }
    let password = null;
    let args = null;

    // Only letters
    if (
      checkboxes[0].checked &&
      !checkboxes[1].checked &&
      !checkboxes[2].checked
    ) {
      args = {
        characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      };
    }

    // Only numbers
    if (
      !checkboxes[0].checked &&
      checkboxes[1].checked &&
      !checkboxes[2].checked
    ) {
      args = {
        type: "numeric",
      };
    }

    // Only symbols
    if (
      !checkboxes[0].checked &&
      !checkboxes[1].checked &&
      checkboxes[2].checked
    ) {
      args = {
        characters: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
      };
    }

    // Letters + numbers
    if (
      checkboxes[0].checked &&
      checkboxes[1].checked &&
      !checkboxes[2].checked
    ) {
      args = {
        type: "alphanumeric",
      };
    }

    // Letters + symbols
    if (
      !checkboxes[0].checked &&
      checkboxes[1].checked &&
      checkboxes[2].checked
    ) {
      args = {
        characters:
          "!\"#$%&'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
      };
    }

    // Numbers + symbols
    if (
      checkboxes[0].checked &&
      !checkboxes[1].checked &&
      checkboxes[2].checked
    ) {
      args = {
        characters: "!\"#$%&'()*+,-./0123456789:;<=>?@[\\]^_`{|}~",
      };
    }

    // Letters + numbers + symbols
    if (
      checkboxes[0].checked &&
      checkboxes[1].checked &&
      checkboxes[2].checked
    ) {
      args = {
        type: "ascii-printable",
      };
    }

    if (args) {
      args.length = length;
      password = cryptoRandomString(args);
      this.setState({
        password: password,
        alert: null,
      });
    } else {
      this.setState({
        alert: "Select at least one option",
      });
    }
  };

  copyToClipboard = () => {
    copy(this.state.password);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.generatePassword();
  };

  onCheckboxChanged = (event, index) => {
    const newCheckboxes = [...this.state.checkboxes];
    newCheckboxes[index] = { ...this.state.checkboxes[index] };
    newCheckboxes[index].checked = !this.state.checkboxes[index].checked;
    this.setState({
      checkboxes: newCheckboxes,
    });
    this.generatePassword(newCheckboxes);
  };

  onLengthChange = (event) => {
    this.setState({
      passwordLength: event.target.value,
    });
    this.generatePassword(this.state.checkboxes, event.target.value);
  };

  render() {
    let password = "";
    if (this.state.alert) {
      password = (
        <span className={classes.Red}>{this.state.alert}</span>
        // <span className={classes.Red}>Select at least one option</span>
      );
    } else {
      password = this.state.password;
    }
    return (
      <div className={classes.App}>
        <h1>Generate secure password</h1>
        <p className={classes.Password}>{password}</p>
        <form onSubmit={this.onFormSubmit}>
          <div className={classes.InputContainer}>
            <label htmlFor="length">Password length:</label>
            <input
              type="number"
              id="length"
              value={this.state.passwordLength}
              onChange={this.onLengthChange}
            />
          </div>
          {this.state.checkboxes.map((checkbox, index) => (
            <Checkbox
              key={checkbox.value}
              value={checkbox.value}
              label={checkbox.label}
              checked={checkbox.checked}
              changed={(event) => this.onCheckboxChanged(event, index)}
            />
          ))}

          <Button type="button" btnType="link" clicked={this.copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} /> Copy to clipboard
          </Button>
          <Button type="submit">Generate</Button>
        </form>
      </div>
    );
  }
}

export default App;
