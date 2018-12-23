import { Button, Grid, Paper } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import AssignmentIcon from "@material-ui/icons/Assignment";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Offer.scss";

class Offer extends Component {
    render() {
        const { offer, theme } = this.props;
        const { id, title, earningTotal, earningHourly, location, jobCategoryKey } = offer;
        const OfferActionsWithRouter = withRouter(OfferActions);
        const { primary } = theme.palette.text;

        return (
            <Paper className="card">
                <div className="hero" style={{ color: primary }}>
                    <AssignmentIcon style={{ fontSize: 30 }} />
                    <span className="category-name">{jobCategoryKey}</span>
                    <h2 className="title">{title}</h2>
                    <div className="earning-total">{earningTotal}</div>
                    <div className="earning-hourly">{earningHourly} pro Stunde</div>
                </div>

                <div className="card-content">
                    <Grid container spacing={16} justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <div className="info">
                                <div className="location">
                                    <MapOutlinedIcon />
                                    <span className="name">{location.locationDisplayName}</span>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <OfferActionsWithRouter id={id} />
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        );
    }
}

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

const WithTheme = withTheme()(Offer);

export default WithTheme;
