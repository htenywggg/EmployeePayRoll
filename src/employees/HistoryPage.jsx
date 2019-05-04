import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 500
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  goBack: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px"
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    this.getTable();
  }

  getTable = async () => {
    const id = {
      emp_no: this.props.id
    };
    const url = new URL("http://localhost:3000/api/employeeTable");
    url.search = new URLSearchParams(id);
    const response = await fetch(url);
    const rows = await response.json();
    this.setState({ rows: rows.result });
  };

  renderTable() {
    if (this.state.rows !== []) {
      console.log(this.state.rows);
      const { classes } = this.props;
      return this.state.rows.map(row => {
        return (
          <TableRow className={classes.row} key={row.emp_no}>
            <CustomTableCell component="th" scope="row">
              {row.salary}
            </CustomTableCell>
            <CustomTableCell>{row.from_date.substring(0, 10)}</CustomTableCell>
            <CustomTableCell>{row.to_date.substring(0, 10)}</CustomTableCell>
          </TableRow>
        );
      });
    }
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
        xs={12}
      >
        <Grid item>
          <Paper>
            <Grid
              container
              style={{
                marginTop: "150px"
              }}
              className={classes.historyBox}
            >
              <Grid item>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Salary</CustomTableCell>
                      <CustomTableCell>From Date</CustomTableCell>
                      <CustomTableCell>To Date</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTable()}</TableBody>
                </Table>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.goBack}
                component={Link}
                to={"/" + this.props.id}
              >
                Go Back to Home
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HistoryPage);
