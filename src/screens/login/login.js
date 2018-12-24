import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { login } from "../../shared/api";
import { authUser, hasValidToken } from "../../shared/auth";

const styles = {
    container: {
        display: "flex",
        height: "100%",
        padding: 16,
        flexDirection: "column",
        backgroundColor: "#93e7cf",
        textAlign: "center",
    },
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false, error: undefined, dialogOpen: false, username: "", password: "" };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    componentWillMount() {
        const { history } = this.props;
        if (hasValidToken()) history.push("/");
    }

    handleSubmit(event) {
        const { history } = this.props;
        const { username, password } = this.state;

        event.preventDefault();
        this.setState({ loading: true, error: undefined });

        login(username, password)
            .then(({ response, body }) => {
                if (response.ok) {
                    authUser(body);
                    history.push("/");
                } else {
                    throw body.error;
                }
            })
            .catch(error => this.setState({ error, loading: false, dialogOpen: true }));
    }

    handleInputChange(event) {
        const { target } = event;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    }

    handleDialogClose() {
        this.setState({ dialogOpen: false });
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;

        return (
            <div className={classes.container}>
                <Typography component="h1" variant="overline" color="textPrimary">
                    Login
                </Typography>

                <form onSubmit={this.handleSubmit} noValidate>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="username"
                                    value={this.state.username}
                                    label="Email"
                                    required
                                    type="email"
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="password"
                                    value={this.state.password}
                                    label="Password"
                                    required
                                    type="password"
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" disabled={!username || !password} fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Oops, an error has occurred. Check your email and password.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="secondary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
