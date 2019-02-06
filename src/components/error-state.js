import { Button, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedRoundedIcon from "@material-ui/icons/SentimentVeryDissatisfiedRounded";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
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
            <Button variant="contained" color="primary" onClick={onTryAgain}>
                Try again
            </Button>
        </div>
    );
}

ErrorState.propTypes = {
    classes: PropTypes.object.isRequired,
    onTryAgain: PropTypes.func.isRequired,
};

export default withStyles(styles)(ErrorState);
