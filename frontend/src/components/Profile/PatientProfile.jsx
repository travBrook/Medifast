import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { List } from "react-content-loader";
import { Upload, message, Avatar, Button } from "antd";
import { StyleSheet, css } from "aphrodite";
import AppointmentCard from "../Appointment/AppointmentCard";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  patientInfo: {
    padding: 12,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: "3em",
    marginBottom: "3%"
  },
  appt: {
    marginTop: "3%",
    paddingLeft: 24,
    fontSize: 20,
    fontWeight: "bold"
  },
  healthy: {
    fontSize: 16,
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "10%"
  },
  appointment: {
    height: "92%",
    width: "96%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 28
  },
  profile: {
    height: "96%",
    width: "96%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#ffffff"
  },
  billing: {
    height: "92%",
    width: "96%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 28
  },
  flexRow: {
    flexDirection: "row",
    display: "flex"
  },
  flexColumn: {
    flexDirection: "column",
    display: "flex"
  },
  flexBody: {
    display: "flex"
  },
  header: {
    textAlign: "center",
    position: "relative",
    height: 200,
    backgroundImage: "linear-gradient(#82ccdd, #4a69bd)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    borderBottomLeftRadius: "70% 20%",
    borderBottomRightRadius: "70% 20%"
  },
  profileInfo: {
    marginTop: "25%",
    padding: 24,
    fontSize: 20,
    lineHeight: "3vw",
    textAlign: "center"
  },
  modal: {
    backgroundColor: themeColor.white,
    position: "relative",
    border: "1px solid",
    borderRadius: 3,
    //borderColor: themeColor.grey0,
    padding: 40,
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
    width: "auto",
    height: "auto"
  }
});

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

class PatientProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextAppointment: undefined,
      loading: true,
      imageUrl: undefined,
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = info => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl
        })
      );
    }
  };

  componentDidMount = () => {
    const { auth } = this.props;
    const { username } = auth.user;
    axios.get("http://localhost:8000/doctor/bookings").then(res => {
      const list = _.filter(res.data, { patientusername: username });
      if (list.length !== 0) {
        const sort = _.sortBy(list, o => {
          return new moment(o.bdate);
        });
        this.setState({
          nextAppointment: sort[0],
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { user } = this.props;
    const { classes } = this.props;
    const { loading, imageUrl } = this.state;
    return (
      <div className={css(styles.flexBody)}>
        <div className={css(styles.flexColumn)}>
          <div style={{ flex: "1 1 360px", width: "520px" }}>
            <div className={css(styles.appointment)}>
              <span style={{ fontWeight: "bold" }}>Upcoming Appointments:</span>
              <hr />
              {loading ? (
                <List />
              ) : (
                <div>
                  {!!this.state.nextAppointment ? (
                    <div>
                      <AppointmentCard
                        size="small"
                        appointment={this.state.nextAppointment}
                      />
                    </div>
                  ) : (
                    <div className={css(styles.healthy)}>
                      <br />
                      <span style={{ fontSize: 36 }}>👏</span>
                      <br />
                      <br />- No appointment found. Stay healthy! -
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: "1 1 360px", width: "520px" }}>
            <div className={css(styles.billing)}>
              <span style={{ fontWeight: "bold" }}>Billing:</span>
            </div>
          </div>
        </div>
        <div className={css(styles.flexRow)}>
          <div style={{ flex: "1 1 360px", width: "520px" }}>
            <div className={css(styles.profile)}>
              <div className={css(styles.header)}>
                <div
                  style={{
                    paddingTop: "12%",
                    paddingBottom: "8%",
                    color: "#ffffff",
                    fontSize: 28,
                    fontWeight: "bold"
                  }}
                >
                  My Profile
                </div>
                {!!imageUrl ? (
                  <Avatar src={imageUrl} size={128} />
                ) : (
                  <Avatar size={128} icon="user" />
                )}
                <br />
                <br />
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  <Button>Change Avatar</Button>
                </Upload>
              </div>
              <div className={css(styles.profileInfo)}>
                <span style={{ fontWeight: "bold" }}>Name: </span>
                Xiner Zhang
                {/* {user.First_name} {user.Last_Name} */}
                <br />
                <span style={{ fontWeight: "bold" }}>Current Plan: </span>
                Medicare Standard
                <br />
                <br />
                <br />
                <Button
                  type="primary"
                  onClick={this.handleClickOpen}
                  style={{
                    width: "80%",
                    height: 36,
                    borderRadius: 20,
                    borderColor: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "#1e3799"
                  }}
                >
                  Update Security Question
                </Button>
                <Modal show={this.state.open} onHide={this.handleClose}>
                  <div className={css(styles.modal)}>
                    <form>
                      <div align="center">
                        <ControlLabel>Security Question</ControlLabel>
                      </div>
                      <br />
                      <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.onChange}
                        name="securityQ"
                      >
                        <option>Select Securtiy Question 1</option>
                        <option value="What's the name of your first teacher?">
                          What's the name of your first teacher?
                        </option>
                        <option value="What is your dream job?">
                          What is your dream job?
                        </option>
                        <option value="What is your favourite color?">
                          What is your favourite color?
                        </option>
                      </FormControl>
                      <br />
                      <FormControl
                        className={css(styles.inputBox)}
                        type="text"
                        name="securityAns"
                        label="Security Answer"
                        placeholder="Enter your answer here."
                        value={this.state.securityAns}
                        onChange={this.onChange}
                      />
                      <br />
                      <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.onChange}
                        name="securityQ2"
                      >
                        <option>Select Securtiy Question 2</option>
                        <option value="What's the name of your first school?">
                          What's the name of your first school?
                        </option>
                        <option value="What's the name of your first pet?">
                          What's the name of your first pet?
                        </option>
                        <option value="What is your favourite food?">
                          What is your favourite food?
                        </option>
                      </FormControl>
                      <br />
                      <FormControl
                        className={css(styles.inputBox)}
                        type="text"
                        name="securityAns2"
                        label="Security Answer"
                        placeholder="Enter your answer here."
                        value={this.state.securityAns2}
                        onChange={this.onChange}
                      />
                      <div align="center">
                        <Button
                          type="primary"
                          style={{
                            width: "80%",
                            marginTop: 24,
                            height: 36,
                            borderRadius: 20,
                            borderColor: "#fff",
                            fontWeight: "bold",
                            backgroundColor: "#4a69bd"
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </div>
                </Modal>
                <br />
                <Button
                  type="primary"
                  style={{
                    width: "80%",
                    marginTop: 24,
                    height: 36,
                    borderRadius: 20,
                    borderColor: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "#4a69bd"
                  }}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PatientProfile);

/* <Grid style={{ width: "100%" }}>
<Row>
  <Col xs={12} md={8}>
    <h1>Welcome Back {user.First_name}</h1>
    <br />
    <div className={css(styles.patientInfo)}>
      <div>
        Name: {user.First_name} {user.Last_Name}
      </div>
      <div>Date of Birth: {user.DOB}</div>
    </div>
  </Col>
  <Col xs={6} md={4}>
    <img src={medical} width="80%" />
  </Col>
</Row>
<Row>
  {loading ? (
    <List />
  ) : (
    <div>
      {!!this.state.nextAppointment ? (
        <div>
          <hr />
          <div className={css(styles.appt)}>
            Your Upcoming Appointment:
          </div>
          <AppointmentCard appointment={this.state.nextAppointment} />
        </div>
      ) : (
        <div className={css(styles.healthy)}>
          - No appointment found. Stay healthy! -
        </div>
      )}
    </div>
  )}
</Row>
</Grid> */
