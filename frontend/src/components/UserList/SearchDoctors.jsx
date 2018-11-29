import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Search } from "antd";
import { themeColor } from "../../theme/colors";
import { Input, Icon } from "antd";
import axios from "axios";
import PatientModal from "./PatientModal";
import UserList from "./UserList";
import button from "./button.css";
import UserView from "./UserView";
import UserCard from "./UserCard";

import {
  FormGroup,
  FormControl,
  DropdownButton,
  MenuItem,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import SearchDocModal from "./SearchDocModal";
//import Button from "../../common/Button";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "5%",
    width: "80%",
    // height: "100%",
    padding: 30,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  innerComponent: {
    borderRadius: 5,
    margin: 24,
    padding: 24,
    background: themeColor.white
  },
  userList: {
    background: "#E3F2FD",
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0
  },
  table: {
    width: "100%",
    color: themeColor.dark1
  },
  box2: {
    margin: "auto",
    marginTop: "3%",
    width: "100%",
    // height: "100%",
    padding: 10,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 5,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  tr: {
    fontWeight: "normal",
    padding: 4,
    borderBottom: "1px solid",
    borderColor: themeColor.grey0
  },
  th: {
    padding: 4,
    fontWeight: "600",
    color: "#1A237E    "
  },
  more: {
    textAlign: "center",
    fontWeight: "bold",
    color: themeColor.dark1
  },
  p: {
    font: "Cagliostro",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FF0000"
  },
  icon: {
    size: 100
  },
  FormGroup: {
    width: " 100%"
  },
  showIcon: {
    size: 300
  },
  noIcon: {
    height: 0,
    overflow: "hidden"
  }
});

export default class SearchDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      modal: false,
      show: false,
      viewType: "",
      activeProfile: null,
      activeInfo: [],
      value: "",
      search: [],
      searchList: [],
      search: "",
      search_lower: "",
      userList_lower: "",
      new_list: "",
      searchbar: true,
      noresults: false,
      isshowall: false,
      showIcon: true
    };
    this.showall = null;
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.onChange = this.onChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.search, "onchange");
  };

  onSubmit = e => {
    e.preventDefault();
    //console.log(search);
    console.log(this.state.search, "onsubmit");
    console.log("here");
    this.setState({ viewType: "Doctor" });
    //this.state.search = this.state.search.toLowerCase();
    this.state.search_lower = this.state.search.toLowerCase();
    console.log(this.state.search_lower, "lowercase");
    this.setState({ showIcon: false });
    axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
      if (res.status === 200) {
        console.log(res.data);
        this.setState({ userList: res.data });
        this.setState({ isshowall: false });
      }
      this.state.userList_lower = JSON.stringify(
        this.state.userList
      ).toLowerCase();
      console.log(this.state.userList_lower, "str");
      const filteredList = this.state.userList.filter(s => {
        const arr = _.map(Object.values(s), function(o) {
          if (typeof o === "string") {
            return o.toLowerCase();
          } else {
            return o;
          }
        });
        // if (arr.includes("/this.state.search.toLowerCase()*/")) {
        // if (_.includes(this.state.search.toLowerCase())) {
        if (arr.includes(this.state.search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });

      console.log(filteredList, "this is filtered list");

      this.setState({ searchList: filteredList });

      if (this.state.searchList.length > 0) {
        this.setState({
          show: true,
          noresults: false

          //activeProfile: user.search
        });
      } else if (this.state.searchList.length === 0) {
        this.setState({
          noresults: true,
          show: false
          //activeProfile: user.search
        });
      }
      console.log(this.state.userList);
      console.log(this.state.searchList, "bindu");
    });
  };

  onSubmit2 = e => {
    e.preventDefault();

    // this.showall = <UserList userType={"Patient"} />;
    this.setState({ isshowall: true });
    this.setState({ show: false });
    this.setState({ noresults: false });
    // this.setState({ searchbar: false });
  };

  handleOpenModal(user) {
    const { userType } = this.props;
    this.state.viewType = "Doctor";
    this.state.showModal = true;
    this.setState({ searchbar: false });

    const docInfo = _.filter(this.state.userList, {
      search: user.search
    });
    this.setState({ activeInfo: docInfo });
  }

  handleCloseModal() {
    this.setState({ showModal: false, activeInfo: [], searchbar: true });
  }

  render() {
    const { type, currentUser } = this.props;

    return (
      <div className={css(styles.box)}>
        {this.state.searchbar ? (
          <div textAlign="center">
            <form onSubmit={this.onSubmit}>
              <FormGroup className={css(styles.FormGroup)}>
                <h2
                  style={{
                    fontSize: 40,
                    textAlign: "center",
                    fontFamily: "Acme, sans-serif"
                  }}
                >
                  Find a Doctor
                </h2>
                <br />
                <h3
                  style={{
                    textAlign: "center",
                    Color: themeColor.grey1,
                    fontSize: 22
                  }}
                >
                  Our find a doctor tool assists you in choosing from our
                  diverse pool of health specialists. Discover better health &
                  wellness by using our doctor ratings & reviews to make your
                  choice.
                </h3>
                <br />
                <InputGroup>
                  <FormControl
                    type="text"
                    name="search"
                    label="search"
                    placeholder="Search ( Ex: Doctor Name, Specialization, City or State)"
                    value={this.state.search}
                    onChange={this.onChange}
                    bsSize="large"
                  />
                  <InputGroup.Button bsSize="large">
                    <Button
                      bsStyle="primary"
                      type={this.onSubmit}
                      bsSize="large"
                    >
                      <Icon type="search" theme="outlined" />
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
            {/* <form onSubmit={this.onSubmit2}>
              <Button bsStyle="success" type={this.onSubmit2}>
                Show All Doctors
              </Button>
              {this.state.isshowall ? this.showall : ""}
            </form> */}
            <br />
            <div
              style={{
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <h3
                style={{
                  display: "inline-block",
                  fontSize: 18
                }}
              >
                Not sure which doctor you are looking for?
              </h3>
              &nbsp; &nbsp;
              <form
                onSubmit={this.onSubmit2}
                style={{ display: "inline-block" }}
              >
                <Button
                  type="submit"
                  onSubmit={this.onSubmit2}
                  style={{ fontSize: "30" }}
                >
                  Show All Doctors{" "}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.show ? (
          // <div className={css(styles.innerComponent)}>
          //   <div className={css(styles.userList)}>
          //     <table className={css(styles.table)}>
          //       <tr className={css(styles.tr)}>
          //         <th className={css(styles.th)}>ID</th>
          //         <th className={css(styles.th)}>NAME </th>
          //         <th className={css(styles.th)}>SPECIALIZATION</th>
          //         <th className={css(styles.th)}>HOSPITAL</th>
          //         <th className={css(styles.th)}>INSURANCE INFORMATION</th>
          //         <th className={css(styles.th)}>CITY</th>
          //         <th className={css(styles.th)}>STATE</th>
          //         <th className={css(styles.th)}>MORE</th>
          //       </tr>
          //     {_.map(this.state.searchList, (user, key) => {
          //       return (
          //         <tr className={css(styles.tr)}>
          //           <th className={css(styles.th)}>{key + 1}</th>
          //           <th className={css(styles.th)}>{user.Last_Name}</th>
          //           <th className={css(styles.th)}>{user.specialization}</th>
          //           <th className={css(styles.th)}>{user.Hospital}</th>
          //           <th className={css(styles.th)}>{user.insurance_name}</th>
          //           <th className={css(styles.th)}>{user.city_name}</th>
          //           <th className={css(styles.th)}>{user.state_name}</th>

          //           <th className={css(styles.more)}>
          //             <a onClick={() => this.handleOpenModal(user)}>
          //               <Icon type="down" theme="outlined" />
          //             </a>
          //           </th>
          //         </tr>
          //       );
          //     })}
          //   </table>
          // </div>
          // </div>
          <div>
            {/* <h3>Available {viewType}s</h3> */}
            {_.map(this.state.searchList, user => {
              return <UserCard type={"Patient"} currentUser={user} />;
            })}
          </div>
        ) : (
          ""
        )}
        {this.state.noresults ? (
          <div align="center">
            <p className={css(styles.p)}>
              <br />
              <br />{" "}
              <Icon
                className={css(styles.icon)}
                type="exclamation-circle"
                theme="filled"
              />{" "}
              Oops! No Results!
            </p>
          </div>
        ) : (
          ""
        )}

        {this.state.isshowall ? (
          <div className={css(styles.box2)}>
            {" "}
            <UserList userType={"Patient"} />;
          </div>
        ) : (
          ""
        )}
        <SearchDocModal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          activeProfile={this.state.activeProfile}
          activeInfo={this.state.activeInfo}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
