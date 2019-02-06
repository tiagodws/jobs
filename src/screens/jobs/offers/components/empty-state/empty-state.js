import { Typography } from "@material-ui/core";
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
    text: {
        fontSize: "1.8rem",
        color: "#9b9b9b",
        textAlign: "center",
    },
};

function EmptyState(props) {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Typography variant="body1" className={classes.text} gutterBottom>
                Have a little patience.
            </Typography>
            <Typography variant="body1" className={classes.text} gutterBottom>
                There are no jobs available right now.
            </Typography>
        </div>
    );
}

EmptyState.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmptyState);
