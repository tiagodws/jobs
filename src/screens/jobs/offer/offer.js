import { Grid, withStyles, Typography, Button } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import ErrorState from "../../../components/error-state";
import LoadingState from "../../../components/loading-state";
import { fetchOffer } from "../../../shared/api";
import OfferBar from "./components/offer-bar";
import ShiftInfo from "../../../components/shift-info";
import AlertBox from "../../../components/alert-box";
import EarningInfo from "../../../components/earning-info";

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
        padding: "16px",
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
                            <Grid container item xs={12}>
                                <AlertBox>
                                    <Typography variant="overline">Status</Typography>
                                    <Typography variant="body1">
                                        Congratulation! You got the job. Please check the requirements for this job.
                                    </Typography>
                                </AlertBox>
                            </Grid>

                            <Grid container item xs={12}>
                                <EarningInfo earningHourly={offer.earningHourly} earningTotal={offer.earningTotal} />
                            </Grid>

                            <Grid container item xs={12}>
                                <div className={classes.shifts}>
                                    {offer.shifts.map((shift, i) => (
                                        <ShiftInfo key={i} beginDate={shift.beginDate} endDate={shift.endDate} />
                                    ))}
                                </div>
                            </Grid>

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
