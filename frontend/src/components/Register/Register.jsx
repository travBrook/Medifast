import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { createUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import Button from "../../common/Button";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  inputBox: {},
  // TODO: Change button style
  loginButton: { width: 80 },
  logo: {
    textAlign: "center"
  }
});
export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      typeOfUser: "role",
      SecurityQuestion1: "",
      SecurityQuestion2: "",
      errorMsg: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === "" ||
      this.state.typeOfUser === "role" ||
      this.state.securityQ == ""
    ) {
      this.setState({ errorMsg: "Please complete all the fields." });
    } else {
      if (this.state.password === this.state.confirmPassword) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          typeOfUser: this.state.typeOfUser,
          securityQ: this.state.SecurityQuestion,
          securityAns: this.state.securityAns
        };
        this.props.createUser(user);
        this.setState({ errorMsg: "" });
        console.log("Creating user");
      } else {
        this.setState({ errorMsg: "Passwords does not match." });
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>
        <br />
        {/*TODO: Create global form*/}
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <ControlLabel>Username:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Password:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Confirm Password:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Role:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="typeOfUser"
            >
              <option value="role">Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="insurance">Insurance Provider</option>
            </FormControl>
            <br />
            <ControlLabel>Security Question</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="typeOfUser"
            >
              <option value="Select a role">Select</option>
              <option value="Q1">What's the name of your first teacher?</option>
              <option value="Q2">What is your dream job?</option>
              <option value="Q3">What is your favourite color?</option>
            </FormControl>
            <br />
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="Security Question Answer"
              label="Username"
              placeholder="Enter your answer here."
              value={this.state.securityAns}
              onChange={this.onChange}
            />
            <br />
            <Button name="Sign Up" type="submit" />
          </FormGroup>
        </form>
        <div className={css(styles.error)}>{this.state.errorMsg}</div>
      </div>
    );
  }
}

Register.propTypes = { createUser: PropTypes.func.isRequired };

export default connect(
  null,
  { createUser }
)(Register);
