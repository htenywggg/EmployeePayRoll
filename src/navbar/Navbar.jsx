import AppBar from "@material-ui/core/AppBar";
import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import TwitterLogo from "./TwitterLogo.png";
import GithubLogo from "./GithubLogo.png";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    font: "roboto"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  }
};

export default withStyles(styles)(
  withAuth(
    class NavBar extends Component {
      state = { authenticated: null, openMenu: false };

      checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      };

      async componentDidMount() {
        this.checkAuthentication();
      }

      async componentDidUpdate() {
        this.checkAuthentication();
      }

      login = async () => {
        this.props.auth.login("/");
      };

      logout = async () => {
        this.props.auth.logout("/");
      };

      handleClick = event => {
        this.setState({ openMenu: true });
      };

      toggleDrawer = open => () => {
        this.setState({
          openMenu: open
        });
      };

      handleClose = () => {
        this.setState({ openMenu: null });
      };

      render() {
        const { classes } = this.props;

        const toolDrawer = (
          <div className={classes.list}>
            <List>
              <ListItem button component="a" href="twitter" target="_blank">
                <ListItemText primary="Twitter" />
                <Link to="/twitter">
                  <img
                    src={TwitterLogo}
                    alt="logo"
                    style={{
                      height: "40px",
                      width: "40px",
                      paddingRight: 4
                    }}
                  />
                </Link>
              </ListItem>
              <ListItem button component="a" href="github" target="_blank">
                <ListItemText primary="GitHub" />
                <Link to="/github">
                  <img
                    src={GithubLogo}
                    alt="logo"
                    style={{
                      height: "40px",
                      width: "40px"
                    }}
                  />
                </Link>
              </ListItem>
            </List>
          </div>
        );

        if (this.state.authenticated === null) return null;
        const logInOut = this.state.authenticated ? (
          <div>
            <Button color="inherit" onClick={this.logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div />
        );

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.toggleDrawer(true)}
                >
                  Company Links
                </Button>   
                <Drawer
                  open={this.state.openMenu}
                  onClose={this.toggleDrawer(false)}
                >
                  <div
                    //tabIndex={0}
                    //role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                  >
                    {toolDrawer}
                  </div>
                </Drawer>

                  
                <Grid Container>
                  <Grid item>
                    <Link
                      to="/news"
                      style={{
                        color: "inherit",
                        textDecoration: "inherit",
                        "&:hover": {
                          textDecoration: "underline"
                        }
                      }}
                    >
                      <Grid container>
                        <Grid item>
                          <img
                            src={TwitterLogo}
                            alt="logo"
                            style={{
                              height: "40px",
                              width: "40px",
                              paddingRight: 4
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="title"
                            style={{
                              fontSize: "15px",
                              color: "#ffffff",
                              paddingTop: 13,
                              fontWeight: 450
                            }}
                          >
                            NEWS FEED
                          </Typography>
                        </Grid>
                      </Grid>
                    </Link>
                  </Grid>
                </Grid>
      
                
                <Typography
                  variant="h6"
                  color="inherit"
                  align="center"
                  className={classes.grow}
                >
                  Employee Payroll
                </Typography>
                <Button color="inherit" href="/">
                  Home
                </Button>
                {logInOut}
              </Toolbar>
            </AppBar>
          </div>
        );
      }
    }
  )
);
