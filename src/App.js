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
      { label: "Symbols", value: "symbols", checked: true },
    ],
  };

  componentDidMount() {
    this.generatePassword();
  }

  generatePassword = (checkboxes = this.state.checkboxes) => {
    let password = null;
    let args = null;

    // Only letters
    if (
      checkboxes[0].checked &&
      !checkboxes[1].checked &&
      !checkboxes[2].checked
    ) {
      args = {
        length: 15,
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
        length: 15,
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
        length: 15,
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
        length: 15,
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
        length: 15,
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
        length: 15,
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
        length: 15,
        type: "ascii-printable",
      };
    }

    if (args) {
      password = cryptoRandomString(args);
    }
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

  onCheckboxChanged = (event, index) => {
    const newCheckboxes = [...this.state.checkboxes];
    newCheckboxes[index] = { ...this.state.checkboxes[index] };
    newCheckboxes[index].checked = !this.state.checkboxes[index].checked;
    this.setState({
      checkboxes: newCheckboxes,
    });
    this.generatePassword(newCheckboxes);
  };

  render() {
    let password = "";
    if (this.state.password) {
      password = this.state.password;
    } else {
      password = (
        <span className={classes.Red}>Select at least one option</span>
      );
    }
    return (
      <div className={classes.App}>
        <h1>Generate secure password</h1>
        <p className={classes.Password}>{password}</p>
        <form onSubmit={this.onFormSubmit}>
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
