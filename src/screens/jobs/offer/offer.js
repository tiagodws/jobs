import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import React, { Component } from "react";
import { withRouter } from "react-router";

import AlertBox from "../../../components/alert-box";
import EarningInfo from "../../../components/earning-info";
import ErrorState from "../../../components/error-state";
import LoadingState from "../../../components/loading-state";
import PricingTable from "../../../components/princing-table";
import ShiftInfo from "../../../components/shift-info";
import LocationInfo from "../../../components/location-info";
import BreakInfo from "../../../components/break-info";
import { fetchOffer } from "../../../shared/api";
import OfferBar from "./components/offer-bar";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    appBar: {
        flexShrink: 0,
        backgroundImage: "linear-gradient(329deg, #fdb49e, #ff8d6b)",
        color: "#ffffff",
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
    shifts: {
        border: "1px solid #cccccc",
        width: "100%",
        padding: 16,
    },
    infoBlock: {
        padding: 16,
        width: "100%",
    },
};

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offer: undefined,
            loading: true,
            error: undefined,
        };

        this.handleTryAgain = this.handleTryAgain.bind(this);
        this.handleGoBackClick = this.handleGoBackClick.bind(this);
    }

    loadData() {
        const { id } = this.props.match.params;
        this.setState({ loading: true, error: undefined });
        fetchOffer(id)
            .then(({ response, body }) => {
                if (response.ok) this.setState({ offer: body, loading: false });
                else throw body.error;
            })
            .catch(error => this.setState({ error, loading: false }));
    }

    handleTryAgain() {
        this.loadData();
    }

    handleGoBackClick() {
        const { history } = this.props;
        history.push("/");
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const { loading, error, offer } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <OfferBar offer={offer} onGoBack={this.handleGoBackClick} />

                {loading && <LoadingState />}
                {error && <ErrorState onTryAgain={this.handleTryAgain} />}
                {!loading && !error && (
                    <div className={classes.contents}>
                        <Grid container spacing={32} justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <AlertBox>
                                    <Typography variant="overline">Status</Typography>
                                    <Typography variant="body1" color="textSecondary" gutterBottom>
                                        {moment().format("DD.MM.YYYY [at] HH:mm")}
                                    </Typography>
                                    <Typography variant="body1">
                                        You have not yet applied for this offer. Please check the requirements before applying.
                                    </Typography>
                                </AlertBox>
                            </Grid>

                            <Grid container item xs={12}>
                                <div className={classes.infoBlock}>
                                    <EarningInfo earningHourly={offer.earningHourly} earningTotal={offer.earningTotal} />
                                </div>
                            </Grid>

                            <Grid container item xs={12}>
                                <div className={classes.infoBlock}>
                                    <PricingTable pricingTables={offer.pricingTables} />
                                </div>
                            </Grid>

                            <Grid container item xs={12}>
                                <div className={classes.shifts}>
                                    {offer.shifts.map((shift, i) => (
                                        <ShiftInfo key={i} beginDate={shift.beginDate} endDate={shift.endDate} />
                                    ))}
                                </div>
                            </Grid>

                            <Grid container item xs={12}>
                                <div className={classes.infoBlock}>
                                    <BreakInfo breakTypes={offer.breakTypes} />
                                </div>
                            </Grid>

                            <Grid container item xs={12}>
                                <div className={classes.infoBlock}>
                                    <LocationInfo location={offer.location} />
                                </div>
                            </Grid>

                            {offer.description && (
                                <Grid item xs={12}>
                                    <div className={classes.infoBlock}>
                                        <Typography variant="overline">Description</Typography>
                                        <Typography variant="body1">{offer.description}</Typography>
                                    </div>
                                </Grid>
                            )}

                            {offer.instructions && (
                                <Grid container item xs={12}>
                                    <AlertBox>
                                        <Typography variant="overline">Requirements & Hints</Typography>
                                        <Typography variant="body1">{offer.instructions}</Typography>
                                    </AlertBox>
                                </Grid>
                            )}

                            <Grid container item xs={12}>
                                <Button variant="contained" color="secondary" fullWidth>
                                    Apply
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Offer));
