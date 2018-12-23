import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import OfferDetail from "../OfferDetail";
import OfferList from "../OfferList";

import "./Main.scss";

class Main extends Component {
    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className="menu-button" color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="grow">
                            My App
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className="container">
                    <Switch>
                        <Route path={`${match.url}`} exact component={OfferList} />
                        <Route path={`${match.url}/:id`} component={OfferDetail} />
                        <Route path={`${match.url}/mine`} component={OfferList} />
                    </Switch>
                </div>

                <BottomNavigation value={1} showLabels className="bottom-navigation">
                    <BottomNavigationAction label="Tasks" icon={<NotificationsNoneOutlinedIcon />} />
                    <BottomNavigationAction label="Discover Jobs" icon={<ListOutlinedIcon />} />
                    <BottomNavigationAction label="My Jobs" icon={<WorkOutlineIcon />} />
                </BottomNavigation>
            </Fragment>
        );
    }
}

Main.propTypes = {
    match: PropTypes.any,
};

export default Main;
