import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Jobs from "./screens/jobs";
import Login from "./screens/login";
import theme from "./shared/theme";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <BrowserRouter>
                        <Switch>
                            <Redirect from="/" to="/jobs" exact />
                            <Route path="/jobs" render={props => <Jobs {...props} />} />
                            <Route path="/login" render={props => <Login {...props} />} />
                        </Switch>
                    </BrowserRouter>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default App;
