import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import RotateLeftRoundedIcon from "@material-ui/icons/RotateLeftRounded";
import React from "react";

const styles = {
    icon: {
        fontSize: "2rem",
        transform: "rotate(90deg)",
        marginRight: 4,
    },
};

function BreakInfo(props) {
    const { classes, breakTypes } = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="overline">Notes</Typography>
            </Grid>

            {breakTypes.map(({ minutes, description }, i) => (
                <Grid key={i} container item alignItems="center" xs={12}>
                    <Typography>
                        <RotateLeftRoundedIcon className={classes.icon} />
                    </Typography>
                    <Typography>
                        {minutes} min {description}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
}

export default withStyles(styles)(BreakInfo);
