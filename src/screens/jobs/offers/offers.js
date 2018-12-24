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
import React, { Component } from "react";
import ErrorState from "../../../components/error-state";
import LoadingState from "../../../components/loading-state";
import { fetchOffers } from "../../../shared/api";
import { deauthUser } from "../../../shared/auth";
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
        };

        this.handleTryAgain = this.handleTryAgain.bind(this);
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleLogoffClick = this.handleLogoffClick.bind(this);
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

    componentDidMount() {
        this.loadData();
    }

    render() {
        const { loading, error, offers } = this.state;
        const { classes } = this.props;

        return (
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

                <div className={classes.contents}>
                    <Grid container spacing={16} justify="center" alignItems="center">
                        {offers.map(offer => (
                            <Grid key={offer.id} item xs={12}>
                                <OffersItem offer={offer} />
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <BottomNavigation value={1} showLabels className={classes.navigator}>
                    <BottomNavigationAction label="Tasks" icon={<NotificationsNoneOutlinedIcon />} />
                    <BottomNavigationAction label="Discover Jobs" icon={<ListOutlinedIcon />} />
                    <BottomNavigationAction label="My Jobs" icon={<WorkOutlineIcon />} />
                </BottomNavigation>
            </div>
        );
    }
}

export default withStyles(styles)(Offers);
