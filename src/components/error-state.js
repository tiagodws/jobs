import { Button, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedRoundedIcon from "@material-ui/icons/SentimentVeryDissatisfiedRounded";
import { withStyles } from "@material-ui/styles";
import React from "react";

const styles = {
    container: {
        height: "100%;",
        width: "100%;",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: "4em",
    },
};

function ErrorState(props) {
    const { classes, onTryAgain } = props;
    return (
        <div className={classes.container}>
            <SentimentVeryDissatisfiedRoundedIcon className={classes.icon} />
            <Typography gutterBottom>Something went wrong</Typography>
            <Button variant="contained" color="secondary" onClick={onTryAgain}>
                Try again
            </Button>
        </div>
    );
}

export default withStyles(styles)(ErrorState);
