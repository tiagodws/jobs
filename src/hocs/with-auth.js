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

        componentDidMount() {
            const authenticated = checkAuthentication();
            this.setState({ authenticated });
        }

        shouldComponentUpdate() {
            const authenticated = checkAuthentication();
            if (authenticated) return true;
            this.goToLogin();
            return false;
        }

        goToLogin() {
            const { history } = this.props;
            history.push({ pathname: "/login" });
        }

        render() {
            const { authenticated } = this.state;
            if (!authenticated) return null;
            return <WrappedComponent {...this.props} />;
        }
    }

    return WithAuth;
}

export default withAuth;
