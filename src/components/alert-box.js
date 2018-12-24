import { withStyles } from "@material-ui/styles";
import FlashOnIcon from "@material-ui/icons/FlashOn";

import React from "react";

const styles = {
    container: {
        width: "100%",
        padding: 16,
        border: "1px solid #ff8d6b",
        position: "relative",
        marginTop: 16,
    },
    iconContainer: {
        borderRadius: "50%",
        border: "1px solid #ff8d6b",
        color: "#ff8d6b",
        position: "absolute",
        top: -16,
        right: 16,
        backgroundColor: "#fafafa",
        height: 32,
        width: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(25deg)"
    },
};

function AlertBox(props) {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <div className={classes.iconContainer}>
                <FlashOnIcon />
            </div>
            {props.children}
        </div>
    );
}

export default withStyles(styles)(AlertBox);
