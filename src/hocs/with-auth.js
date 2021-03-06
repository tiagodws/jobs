import React, { Component } from "react";
import { hasValidToken } from "../shared/auth";
import PropTypes from "prop-types";

function withAuth(WrappedComponent) {
    class WithAuth extends Component {
        constructor(props) {
            super(props);

            this.state = {
                authenticated: false,
            };
        }

        componentDidMount() {
            const authenticated = hasValidToken();
            this.setState({ authenticated });
        }

        shouldComponentUpdate() {
            const authenticated = hasValidToken();
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

    WithAuth.propTypes = {
        history: PropTypes.object.isRequired,
    };

    return WithAuth;
}

export default withAuth;
