import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.id || "",
      first_name: "",
      last_name: "",
      emp_no: this.props.id || "",
      birth_date: "",
      gender: "",
      hire_date: "",
      salary: "",
      position: "",
      from_date: "",
      to_date: ""
    };

    if (this.state.emp_no !== "") {
      this.getEmployee();
    }
  }

  _changePosition = e => {
    this.setState({
      position: e.target.value
    });
  };
  _handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  getEmployee = async () => {
    const id = {
      emp_no: this.state.search
    };
    const url = new URL("http://localhost:3000/api/employee");
    url.search = new URLSearchParams(id);
    const response = await fetch(url);
    const body = await response.json();

    this.setState({
      emp_no: body.result[0].emp_no,
      first_name: body.result[0].first_name,
      last_name: body.result[0].last_name,
      birth_date: body.result[0].birth_date.substring(0, 10),
      hire_date: body.result[0].hire_date.substring(0, 10),
      gender: body.result[0].gender,
      salary: body.result[0].salary,
      from_date: body.result[0].from_date.substring(0, 10),
      to_date: body.result[0].to_date.substring(0, 10)
    });
  };
  //update employee's salary
  saveEmployee = async () => {
    const salary = {
      emp_no: this.state.emp_no,
      salary: this.state.salary,
      from_date: this.state.from_date
    };
    const url = new URL("http://localhost:3000/api/newsalary");
    url.search = new URLSearchParams(salary);
    await fetch(url);
  };

  renderUserProfile() {
    if (this.state.emp_no !== "") {
      const { classes } = this.props;
      return (
        <Grid item>
          <Grid container className={classes.infocontainer} spacing={16}>
            {/* This 4 block is for the left part with employee
            profile picture and description */}
            <Grid item xs={4}>
              <Paper container className={classes.paper}>
                <Grid
                  container
                  justify="flex-start"
                  direction="column"
                  alignItems="center"
                >
                  <Avatar
                    alt="Profile Picture"
                    src="blank-profile.png"
                    className={classes.avatar}
                  />
                  <Typography className={classes.Headings}>
                    {this.state.first_name} {this.state.last_name}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
            {/* This 8 block is for the right part wth employee 
            information and settings */}
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Typography className={classes.Headings}>
                    Personal Settings{/* insert dynamic name here */}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Grid container>
                    <Grid
                      container
                      xs={6}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      <Typography className={classes.label}>
                        First Name
                      </Typography>
                      <TextField
                        disabled
                        variant="outlined"
                        label={this.state.first_name}
                        fullWidth
                        style={{
                          paddingRight: 10
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      xs={6}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      <Typography className={classes.label}>
                        Last Name
                      </Typography>
                      <TextField
                        disabled
                        variant="outlined"
                        label={this.state.last_name}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid
                      container
                      xs={6}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      <Typography className={classes.label}>
                        Employee number
                      </Typography>
                      <TextField
                        disabled
                        variant="outlined"
                        label={this.state.emp_no}
                        fullWidth
                        style={{
                          paddingRight: 10
                        }}
                      />
                    </Grid>
                    <Grid
                      variant="outlined"
                      container
                      xs={6}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      <Typography className={classes.label}>
                        Birth Date
                      </Typography>
                      <TextField
                        disabled
                        variant="outlined"
                        label={this.state.birth_date}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid
                      container
                      xs={6}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      <Typography className={classes.label}>Gender</Typography>
                      <TextField
                        disabled
                        variant="outlined"
                        label={this.state.gender}
                        fullWidth
                        style={{
                          paddingRight: 10
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      xs={6}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      {" "}
                      <Typography className={classes.label}>
                        Hired Date
                      </Typography>
                      <TextField
                        disabled
                        variant="outlined"
                        label={this.state.hire_date}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Typography
                    className={classes.Headings}
                    style={{
                      marginTop: 20,
                      fontFamily: "typeface-roboto"
                    }}
                  >
                    Employee Settings
                  </Typography>
                  <Divider className={classes.divider} />
                  <Grid container>
                    <Grid
                      container
                      xs={12}
                      style={{
                        paddingTop: 20
                      }}
                    >
                      <TextField
                        variant="outlined"
                        label="Salary"
                        value={this.state.salary}
                        onChange={text =>
                          this.setState({ salary: text.target.value })
                        }
                        fullWidth
                        style={{
                          paddingRight: 10
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveButton}
                    onClick={() => {
                      this.saveEmployee();
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.salaryButton}
                    component={Link}
                    to={"/history/" + this.state.emp_no}
                  >
                    Salary History
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  renderSearchBar() {
    const { classes } = this.props;
    return (
      <Grid item>
        <Grid container>
          <Grid item>
            <Paper>
              <Grid
                className={classes.searchcontainer}
                spacing={8}
                direction="column"
              >
                <Grid item>
                  <Grid
                    container
                    className={classes.searchInput}
                    direction="row"
                  >
                    <Grid item xs={9}>
                      <Grid container>
                        <TextField
                          variant="outlined"
                          onChange={text =>
                            this.setState({ search: text.target.value })
                          }
                          defaultValue={this.state.emp_no}
                          label="Employee Id"
                          fullWidth
                          style={{
                            paddingRight: 10
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={2} className={classes.searchButtonContainer}>
                      <Button
                        variant="contained"
                        className={classes.searchButton}
                        color="primary"
                        onClick={() => {
                          this.getEmployee();
                        }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        spacing={8}
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {this.renderSearchBar()}
        {this.renderUserProfile()}
      </Grid>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
    padding: 15
  },
  paper: {
    padding: 30
  },
  divider: {
    width: "100%",
    marginTop: 10
  },
  saveButton: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px",
    marginTop: 20
  },
  profileTitle: {
    fontFamily: "typeface-roboto"
  },
  salaryButton: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px",
    marginTop: 10
  },
  avatar: {
    margin: 10,
    width: 150,
    height: 150
  },
  Headings: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "typeface-roboto"
  },
  margin: {
    margin: 10
  },
  textField: {
    flexBasis: 200
  },
  searchInput: {},
  searchcontainer: {
    marginTop: 100,
    marginBottom: 100,
    padding: 15
  },
  searchButton: {
    searchButton: {
      backgroundColor: "primary",
      height: "47px",
      color: "#ffffff",
      width: "100%",
      minWidth: "30px",
      marginTop: 10
    }
  },
  searchButtonContainer: {
    flexWrap: "wrap",
    display: "flex"
  },
  label: {
    fontSize: 16,
    fontFamily: "typeface-roboto"
  }
};

const positions = [
  {
    value: "Accountant",
    label: "Accountant"
  },
  {
    value: "Janitor",
    label: "Janitor"
  },
  {
    value: "Manager",
    label: "Manager"
  },
  {
    value: "Lead",
    label: "Lead"
  },
  {
    value: "Intern",
    label: "Intern"
  },
  {
    value: "Supervisor",
    label: "Supervisor"
  }
];

export default withStyles(styles)(Employee);
