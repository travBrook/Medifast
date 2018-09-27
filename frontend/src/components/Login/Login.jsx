import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import { authenticateUser } from "../../actions/authActions";

const styles = StyleSheet.create({});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.authenticateUser(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.text)}>
        <form onSubmit={this.onSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            label="Username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = { authenticateUser: PropTypes.func.isRequired };

export default connect(
  null,
  { authenticateUser }
)(Login);