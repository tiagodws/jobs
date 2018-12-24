import React, { Component } from "react";
import { checkAuthentication } from "../shared/auth";

function withAuth(WrappedComponent) {
    class WithAuth extends Component {
        constructor(props) {
            super(props);

            this.state = {
                authenticated: false,
            };
        }
        componentWillMount() {
            const authenticated = checkAuthentication();
            if (!authenticated) this.goToLogin();
            else this.setState({ authenticated });
        }

        componentWillUpdate() {
            const authenticated = checkAuthentication();
            if (!authenticated) this.goToLogin();
            else this.setState({ authenticated });
        }

        goToLogin() {
            const { history } = this.props;
            history.push({ pathname: "/login" });
        }

        render() {
            if (!this.state.authenticated) return null;
            return <WrappedComponent {...this.props} />;
        }
    }

    return WithAuth;
}

export default withAuth;
