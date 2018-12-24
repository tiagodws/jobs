import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import ErrorState from "../../../components/error-state";
import LoadingState from "../../../components/loading-state";
import { declineOffer, fetchOffers } from "../../../shared/api";
import { deauthUser } from "../../../shared/auth";
import DeclineCommentDialog from "./components/dialogs/decline-comment-dialog";
import DeclineReasonDialog from "./components/dialogs/decline-reason-dialog";
import EmptyState from "./components/empty-state";
import OffersItem from "./components/offers-item";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    appBar: {
        flexShrink: 0,
    },
    menuButton: {
        marginLeft: "-12px !important",
        marginRight: "12px !important",
    },
    contents: {
        padding: 16,
        flex: 1,
        overflow: "auto",
    },
    navigator: {
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.2)",
        width: "100%",
        flexShrink: 0,
        zIndex: 1,
    },
    menuList: {
        width: 300,
    },
};

class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            loading: true,
            error: undefined,
            menuOpen: false,
            reasonDialogOpen: false,
            commentDialogOpen: false,
            declineId: undefined,
            declineReason: undefined,
            declineComment: undefined,
        };

        this.handleTryAgain = this.handleTryAgain.bind(this);
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleLogoffClick = this.handleLogoffClick.bind(this);
        this.handleDeclineOffer = this.handleDeclineOffer.bind(this);
        this.handleReasonDialogClose = this.handleReasonDialogClose.bind(this);
        this.handleCommentDialogClose = this.handleCommentDialogClose.bind(this);
    }

    loadData() {
        this.setState({ loading: true, error: undefined });
        fetchOffers()
            .then(({ response, body }) => {
                if (response.ok) this.setState({ offers: body.offers, loading: false });
                else throw body.error;
            })
            .catch(error => this.setState({ error, loading: false }));
    }

    handleTryAgain() {
        this.loadData();
    }

    handleMenuToggle() {
        this.setState(state => ({
            menuOpen: !state.menuOpen,
        }));
    }

    handleLogoffClick() {
        const { history } = this.props;
        deauthUser();
        history.push({ pathname: "/login" });
    }

    handleDeclineOffer(id) {
        this.setState({ declineId: id, reasonDialogOpen: true });
    }

    handleReasonDialogClose(declineReason) {
        const { declineId } = this.state;

        if (!declineReason) return this.setState({ reasonDialogOpen: false, declineReason });
        if (declineReason.needsComment) return this.setState({ reasonDialogOpen: false, commentDialogOpen: true, declineReason });

        declineOffer(declineId, declineReason.name)
            .then(() => {
                this.setState({ reasonDialogOpen: false });
                this.loadData();
            })
            .catch(() => {
                this.setState({ reasonDialogOpen: false });
            });
    }

    handleCommentDialogClose(declineComment) {
        const { declineId, declineReason } = this.state;
        declineOffer(declineId, declineReason.name, declineComment)
            .then(() => {
                this.setState({ commentDialogOpen: false });
                this.loadData();
            })
            .catch(() => {
                this.setState({ commentDialogOpen: false });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const { loading, error, offers, reasonDialogOpen, commentDialogOpen } = this.state;
        const { classes } = this.props;

        return (
            <Fragment>
                <div className={classes.container}>
                    <AppBar position="static" color="secondary" className={classes.appBar}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenuToggle}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                Discover Jobs
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Drawer open={this.state.menuOpen} onClose={this.handleMenuToggle}>
                        <div className={classes.menuList}>
                            <List>
                                <ListItem button onClick={this.handleLogoffClick}>
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Logoff"} />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>

                    {loading && <LoadingState />}
                    {error && <ErrorState onTryAgain={this.handleTryAgain} />}
                    {!loading && !error && !offers.length && <EmptyState />}
                    {!loading && !error && offers.length && (
                        <div className={classes.contents}>
                            <Grid container spacing={16}>
                                {offers.map(offer => (
                                    <Grid key={offer.id} item xs={12} sm={6}>
                                        <OffersItem offer={offer} onDeclineOffer={() => this.handleDeclineOffer(offer.id)} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    )}

                    <BottomNavigation value={1} showLabels className={classes.navigator}>
                        <BottomNavigationAction label="Tasks" icon={<NotificationsNoneOutlinedIcon />} />
                        <BottomNavigationAction label="Discover Jobs" icon={<ListOutlinedIcon />} />
                        <BottomNavigationAction label="My Jobs" icon={<WorkOutlineIcon />} />
                    </BottomNavigation>
                </div>

                <DeclineReasonDialog open={reasonDialogOpen} onClose={this.handleReasonDialogClose} />
                <DeclineCommentDialog open={commentDialogOpen} onClose={this.handleCommentDialogClose} />
            </Fragment>
        );
    }
}

Offers.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Offers);
