import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import theme from "./shared/theme";
import login from "./screens/login";
import jobs from "./screens/jobs";
import withAuth from "./hocs/with-auth";
import "./app.scss";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline>
                        <Switch>
                            <Redirect from="/" to="/jobs" exact />
                            <Route path="/jobs" component={withAuth(jobs)} />
                            <Route path="/login" component={login} />
                        </Switch>
                    </CssBaseline>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
