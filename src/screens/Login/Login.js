import Button from "@material-ui/core/Button";
import { withTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { login } from "../../shared/api";
import { checkAuthentication, authUser } from "../../shared/auth";
import "./login.scss";
import { TableBody } from "@material-ui/core";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const { history } = this.props;
        if (checkAuthentication()) history.push("/");
    }

    handleSubmit(event) {
        const { history } = this.props;
        const { username, password } = this.state;

        event.preventDefault();
        this.setState({ loading: true });

        login(username, password)
            .then(({ response, body }) => {
                if (response.ok) {
                    authUser(body);
                    history.push("/");
                } else {
                    throw body.error;
                }
            })
            .catch(error => this.setState({ error, loading: false }));
    }

    handleInputChange(event) {
        const { target } = event;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    }

    render() {
        const { theme } = this.props;
        const { primary } = theme.palette.text;

        return (
            <div className="login">
                <h1 className="page-title" style={{ color: primary }}>
                    Login
                </h1>
                <form onSubmit={this.handleSubmit} noValidate>
                    <TextField name="username" label="Email" placeholder="Email" required type="email" onChange={this.handleInputChange} />
                    <TextField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        required
                        type="password"
                        onChange={this.handleInputChange}
                    />

                    <Button variant="contained" color="secondary" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default withTheme()(Login);
