import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import OffersItemHero from "./components/offers-item-hero";
import ShiftInfo from "../../../../../components/shift-info";

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

class offer extends Component {
    render() {
        const { offer, classes } = this.props;
        const { id, location } = offer;

        return (
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
                            <OfferActionsWithRouter id={id} />
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        );
    }
}

const OfferActionsWithRouter = withRouter(OfferActions);

function OfferActions({ id, match }) {
    return (
        <Grid container spacing={8} justify="center" alignItems="center">
            <Grid item xs={12}>
                <Link to={`${match.url}/${id}`}>
                    <Button variant="contained" color="secondary" fullWidth>
                        See details
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Button color="secondary" fullWidth>
                    Not Interested
                </Button>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(offer);
