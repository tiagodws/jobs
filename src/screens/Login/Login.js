import Button from "@material-ui/core/Button";
import { withTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { email, required } from "redux-form-validators";
import { authUser } from "../../actions";
import "./Login.scss";

class Login extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps({ authenticated }) {
        const { history } = this.props;
        if (authenticated) history.push("/");
    }

    onFormSubmit({ username, password }) {
        const { authUser } = this.props;
        authUser(username, password);
    }

    render() {
        const { handleSubmit, theme } = this.props;
        const { primary } = theme.palette.text;

        return (
            <div className="login">
                <h1 className="page-title" style={{ color: primary }}>
                    Login
                </h1>
                <form onSubmit={handleSubmit(this.onFormSubmit)} noValidate autoComplete="off">
                    <Field
                        label="Email"
                        name="username"
                        component={this.renderField}
                        type="email"
                        required
                        validate={[required(), email()]}
                    />
                    <Field label="Password" name="password" component={this.renderField} type="password" required validate={[required()]} />

                    <Button variant="contained" color="secondary" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }

    renderField({ input, type, required, label, meta }) {
        const hasError = Boolean(meta.touched && meta.error);
        return <TextField label={label} required={required} type={type} placeholder={label} error={hasError} {...input} />;
    }
}

function mapStateToProps({ auth }) {
    return { authenticated: Boolean(auth.token) };
}

const WithTheme = withTheme()(Login);
const WithReduxForm = reduxForm({
    form: "login",
    fields: ["username", "password"],
})(WithTheme);

export default connect(
    mapStateToProps,
    { authUser }
)(WithReduxForm);
