import React, { Component } from "react";
import { checkAuthentication } from "../shared/auth";

function withAuth(WrappedComponent) {
    class WithAuth extends Component {
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
            return <WrappedComponent {...this.props} />;
        }
    }

    return WithAuth;
}

export default withAuth;
