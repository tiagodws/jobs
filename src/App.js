import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import store from "./shared/store";
import theme from "./shared/theme";
import Login from "./screens/Login";
import Main from "./screens/Main";
import withAuth from "./hocs/with-auth";
import "./App.scss";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline>
                            <Switch>
                                <Redirect from="/" to="/jobs" exact />
                                <Route path="/jobs" component={withAuth(Main)} />
                                <Route path="/login" component={Login} />
                            </Switch>
                        </CssBaseline>
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
