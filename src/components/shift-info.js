import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import moment from "moment";

const styles = {
    shiftValue: {
        display: "flex",
        fontWeight: 500,
    },
    shiftDay: {
        padding: "1px 4px",
        border: "1px solid",
        borderRadius: 4,
        fontSize: "0.8rem",
        marginRight: 8,
    },
};

function ShiftInfo(props) {
    const { classes, beginDate, endDate } = props;
    const beginMoment = moment(beginDate);
    const endMoment = moment(endDate);

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant="overline">Date</Typography>
                <Typography variant="body1" className={classes.shiftValue}>
                    <span className={classes.shiftDay}>{beginMoment.format("dd")}</span>
                    {beginMoment.format("DD.MM")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline">Time</Typography>
                <Typography variant="body1" className={classes.shiftValue}>
                    {beginMoment.format("HH:mm")} — {endMoment.format("HH:mm")}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(ShiftInfo);
