import React, { Component } from "react";
import Employee from "../employees/Employee";
import Logo from "./rocket.gif";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "@okta/okta-react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    marginTop: 10,
    marginLeft: '25%',
    width: '50%',  
  },
  landingPage: {
    marginTop: '10%',

  },
  logo: {
    width: '100%',
    objectFit: 'cover',
  }
};

class Home extends Component {
  state = { authenticated: null };

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

  render() {
    const { classes } = this.props;
    // This block is to show login landing page if not authenticated
    // and a the employee search bar if user IS authenticated
    if (this.state.authenticated === null) return null;

    const isAuthenticated = this.state.authenticated ? (
      <div>
        <Employee id={this.props.id}/>
      </div>
    ) : (
      <div>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} className={classes.landingPage}>
            <Typography variant="h1">RocketPay</Typography>
            <Button 
              color="inherit" 
              variant="contained" 
              size="large"
              className={classes.button}
              onClick={this.login}>
              Login
            </Button>
            <div>
              <img src={Logo} alt="rocket gif"
               className={classes.logo}
              />
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        
      </div>
    );

    // return the result of the if statement
    return (
      <div>
      {isAuthenticated}
      </div>
    );
    
  }
} export default withAuth(
    withStyles(styles)(Home)
    )
