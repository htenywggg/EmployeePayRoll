import React, { Component } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

class News extends Component {
  render() {
    const { classes } = this.props;
    return (


      
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Paper>
            <Grid
              container
              direction="column"
              className={classes.twittercontainer}
            >
              <Grid item>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="PayrollEmployee"
                  options={{ height: 400, width: 400 }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.goBack}
                  component={Link}
                  to="/"
                >
                  Go Back to Home
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 30
  },
  twittercontainer: {
    marginTop: 150
  },
  goBack: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px"
  }
};

export default withStyles(styles)(News);
