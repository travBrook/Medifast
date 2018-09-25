import React from "react";
import { StyleSheet, css } from "aphrodite";
// import { BrowserRouter as Redirect } from "react-router-dom";

const styles = StyleSheet.create({
  text: {
    color: "blue"
  }
});

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
      //   redirectToReferrer: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onChange.bind(this);
  }

  onClick = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  onChange = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  //   onSubmit(e) {
  //     e.preventDefault();

  //     const userData = {
  //       email: this.state.email,
  //       password: this.state.password
  //     };

  //     this.props.loginUser(userData);
  //   }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    // const { redirectToReferrer } = this.state;

    // if (redirectToReferrer) {
    //   return <Redirect to={from} />;
    // }

    return (
      <div className={css(styles.text)}>
        Username:
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.onChange}
        />
        Password:
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        {/* <button onClick={this.onClick}>Log in</button> */}
      </div>
    );
  }
}
