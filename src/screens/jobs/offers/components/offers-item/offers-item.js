import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import ShiftInfo from "../../../../../components/shift-info";
import OffersItemHero from "./components/offers-item-hero";

const styles = {
    container: {
        overflow: "hidden",
    },
    content: {
        padding: "16px 24px",
    },
    location: {
        display: "flex",
    },
    locationIcon: {
        marginRight: 8,
    },
};

class Offer extends Component {
    handleDeclineOffer() {
        this.setState({ reasonDialogOpen: true });
    }

    render() {
        const { offer, classes, match, onDeclineOffer } = this.props;
        const { id, location } = offer;

        return (
            <Fragment>
                <Paper className={classes.container}>
                    <OffersItemHero offer={offer} />

                    <div className={classes.content}>
                        <Grid container spacing={16} justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <div className={classes.location}>
                                    <MapOutlinedIcon className={classes.locationIcon} />
                                    <Typography variant="body1">{location.locationDisplayName}</Typography>
                                </div>
                            </Grid>

                            {offer.shifts.map((shift, i) => (
                                <Grid key={i} item xs={12}>
                                    <ShiftInfo beginDate={shift.beginDate} endDate={shift.endDate} />
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <Grid container spacing={8} justify="center" alignItems="center">
                                    <Grid item xs={12}>
                                        <Link to={`${match.url}/${id}`}>
                                            <Button variant="contained" color="primary" fullWidth>
                                                See details
                                            </Button>
                                        </Link>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button color="primary" fullWidth onClick={onDeclineOffer}>
                                            Not Interested
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

Offer.propTypes = {
    classes: PropTypes.object.isRequired,
    offer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    onDeclineOffer: PropTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(Offer));
