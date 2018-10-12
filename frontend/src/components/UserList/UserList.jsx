import React from "react";
import axios from "axios";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";
import { themeColor } from "../../theme/colors";
import PatientModal from "./PatientModal";

const styles = StyleSheet.create({
  innerComponent: {
    borderRadius: 5,
    margin: 24,
    padding: 24,
    background: themeColor.white
  },
  userList: {
    background: themeColor.snow0,
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0
  },
  table: {
    width: "100%",
    color: themeColor.dark1
  },
  tr: {
    fontWeight: "normal",
    padding: 4,
    borderBottom: "1px solid",
    borderColor: themeColor.grey0
  },
  th: {
    padding: 4,
    fontWeight: "normal"
  },
  more: {
    textAlign: "center",
    fontWeight: "bold",
    color: themeColor.dark1
  }
});
export default class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      modal: false,
      activeProfile: null,
      activeInfo: []
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(user) {
    this.setState({
      showModal: true,
      activeProfile: user.username
    });

    axios.get("http://127.0.0.1:8000/patient/history").then(res => {
      if (res.status === 200) {
        const mediHis = _.filter(res.data, {
          username: this.state.activeProfile
        });
        this.setState({ activeInfo: mediHis });
      }
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false, activeInfo: [] });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/patient/profile").then(res => {
      if (res.status === 200) {
        this.setState({ userList: res.data });
      }
    });
  }

  render() {
    return (
      <div className={css(styles.innerComponent)}>
        <h3>Available Patients</h3>
        <br />
        <div className={css(styles.userList)}>
          <table className={css(styles.table)}>
            <tr className={css(styles.tr)}>
              <th className={css(styles.th)}>Patient ID</th>
              <th className={css(styles.th)}>Name</th>
              <th className={css(styles.th)}>Gender</th>
              <th className={css(styles.th)}>Date of Birth</th>
              <th className={css(styles.th)}>More</th>
            </tr>
            {_.map(this.state.userList, (user, key) => {
              return (
                <tr className={css(styles.tr)}>
                  <th className={css(styles.th)}>{key + 1}</th>
                  <th className={css(styles.th)}>{user.username}</th>
                  <th className={css(styles.th)}>{user.gender}</th>
                  <th className={css(styles.th)}>{user.DOB}</th>
                  <th className={css(styles.more)}>
                    <a onClick={() => this.handleOpenModal(user)}>
                      <Icon type="down" theme="outlined" />
                    </a>
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
        <PatientModal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          activeProfile={this.state.activeProfile}
          activeInfo={this.state.activeInfo}
        />
      </div>
    );
  }
}