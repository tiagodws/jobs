import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function withAuth(WrappedComponent) {
    class WithAuth extends Component {
        componentWillMount() {
            const { authenticated } = this.props;
            if (!authenticated) this.goToLogin();
        }

        componentWillUpdate(nextProps) {
            const { authenticated } = nextProps;
            if (!authenticated) this.goToLogin();
        }

        goToLogin() {
            const { history } = this.props;
            history.push({ pathname: "/login" });
        }

        render() {
            const { authenticated } = this.props;
            if (!authenticated) return null;
            return <WrappedComponent {...this.props} />;
        }
    }

    function mapStateToProps({ auth }) {
        return { authenticated: Boolean(auth.token) };
    }

    WithAuth.propTypes = {
        authenticated: PropTypes.bool,
        history: PropTypes.any,
    };

    return connect(mapStateToProps)(WithAuth);
}

export default withAuth;
