import React, { Component } from "react";
import cryptoRandomString from "crypto-random-string";
import copy from "copy-to-clipboard";

import Button from "./components/Button/Button";
import classes from "./App.module.css";

class App extends Component {
  state = {
    password: "",
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

  render() {
    return (
      <div className={classes.App}>
        <p className={classes.Password}>{this.state.password}</p>
        <Button btnType="link" clicked={this.copyToClipboard}>
          Copy to clipboard
        </Button>
        <Button clicked={this.generatePassword}>Generate</Button>
      </div>
    );
  }
}

export default App;
