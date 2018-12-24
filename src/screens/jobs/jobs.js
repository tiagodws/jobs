import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
import withAuth from "../../hocs/with-auth";
import Offer from "./offer";
import Offers from "./offers";

function Jobs(props) {
    const { match } = props;
    return (
        <Switch>
            <Route path={`${match.url}`} exact render={props => <Offers {...props} />} />
            <Route path={`${match.url}/:id`} render={props => <Offer {...props} />} />
        </Switch>
    );
}

Jobs.propTypes = {
    match: PropTypes.object.isRequired,
};

export default withAuth(Jobs);
