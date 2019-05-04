import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, ImplicitCallback } from "@okta/okta-react";
import Navbar from "./navbar/Navbar";
import HomePage from "./home/HomePage";
import HistoryPage from "./employees/HistoryPage";
import WebPortal from "./webportal/WebPortal";
import Login from "./auth/Login";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import NewsPage from "./news/News";

const config = {
  issuer: "https://dev-647222.okta.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oafezx6pCvVd6zCI356"
};

class App extends Component {
  
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Security
            issuer={config.issuer}
            client_id={config.client_id}
            redirect_uri={config.redirect_uri}
            onAuthRequired={this.onAuthRequired}
          >
            <Navbar />

            <Switch>
              <Route
                exact
                path="/twitter"
                component={() => (window.location = "http://twitter.com")}
              />
              <Route
                exact
                path="/github"
                component={() => (window.location = "http://github.com")}
              />
              <Route exact path="/" component={HomePage} />
            </Switch>
            <Route
              path="/(.+)"
              render={() => (
                <div>
                  <Switch>
                    <Route
                      path="/login"
                      render={() => (
                        <Login baseUrl="https://dev-500578.oktapreview.com" />
                      )}
                    />
                    <Route
                      path="/implicit/callback"
                      component={ImplicitCallback}
                    />
                    <Route path="/portal" component={WebPortal} />
                    <Route
                      path="/github"
                      component={() =>
                        (window.location = "https://github.com/login")
                      }
                    />
                    <Route path="/news" component={NewsPage} />
                    <Route
                      exact
                      path="/history/:id(\d+)"
                      render={props => {
                        const id = props.match.params.id;
                        return <HistoryPage id={id} />;
                      }}
                    />
                    <Route
                      exact
                      path="/:id(\d+)"
                      render={props => {
                        const id = props.match.params.id;
                        return <HomePage id={id} />;
                      }}
                    />
                  </Switch>
                </div>
              )}
            />
          </Security>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
