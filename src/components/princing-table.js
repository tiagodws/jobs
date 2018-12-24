import { Divider, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

const styles = {
    summary: {
        fontWeight: 500,
    },
};

function PricingTable(props) {
    const { pricingTables, classes } = props;
    const summary = pricingTables.find(({ isSummary }) => isSummary);

    return (
        <Fragment>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="overline">Salary detail</Typography>
                </Grid>

                {pricingTables.map((item, i) => (
                    <Grid key={i} item xs={12}>
                        {renderPricingTableItem(item)}
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    {renderPricingTableSummary(classes, summary)}
                </Grid>
            </Grid>
        </Fragment>
    );
}

function renderPricingTableItem(item) {
    const { earningHourly, earningTotal, name, minutes, times, unpaid } = item;
    const hours = (minutes / 60).toFixed(2);
    const showHours = hours > 1;

    return (
        <Grid container>
            <Grid container item xs={8}>
                <Typography variant="body1">
                    {times && `${times} x `}
                    {showHours ? `${hours} h` : `${minutes} min`} {name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    &nbsp;({unpaid ? "unpaid" : `${earningHourly}/h`})
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1" align="right">
                    {earningTotal}
                </Typography>
            </Grid>
        </Grid>
    );
}

function renderPricingTableSummary(classes, summary) {
    return (
        <Grid container>
            <Grid item xs={8}>
                <Typography variant="body1" className={classes.summary}>
                    Total Salary
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1" className={classes.summary} align="right">
                    {summary.earningTotal}
                </Typography>
            </Grid>
        </Grid>
    );
}

PricingTable.propTypes = {
    classes: PropTypes.object.isRequired,
    pricingTables: PropTypes.array.isRequired,
};

export default withStyles(styles)(PricingTable);
