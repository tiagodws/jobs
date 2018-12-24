import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
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

export default withStyles(styles)(EarningInfo);
