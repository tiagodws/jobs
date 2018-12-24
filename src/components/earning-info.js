import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = {
    container: { textAlign: "center" },
    earningTotal: {
        fontSize: "3.5rem",
        fontWeight: 300,
        lineHeight: "normal",
    },
};

function EarningInfo(props) {
    const { classes, earningHourly, earningTotal } = props;
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Typography className={classes.earningTotal}>{earningTotal}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{earningHourly} pro Stunde</Typography>
            </Grid>
        </Grid>
    );
}

EarningInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    earningHourly: PropTypes.string.isRequired,
    earningTotal: PropTypes.string.isRequired,
};

export default withStyles(styles)(EarningInfo);
