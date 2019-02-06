import { CircularProgress } from "@material-ui/core";
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
};

function LoadingState(props) {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <CircularProgress color="primary" />
        </div>
    );
}

LoadingState.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingState);
