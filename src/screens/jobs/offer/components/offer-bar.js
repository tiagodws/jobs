import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = {
    appBar: {
        backgroundImage: "linear-gradient(329deg, #fdb49e, #ff8d6b)",
        color: "#ffffff",
        flexShrink: 0,
    },
    backButton: {
        marginLeft: "-12px !important",
        marginRight: "12px !important",
    },
    container: {
        textAlign: "center",
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
    },
    icon: {
        fontSize: 30,
    },
    title: { marginTop: 0, color: "#ffffff", fontSize: "2.5rem", fontWeight: 500 },
    category: { fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 16 },
};

function OfferBar(props) {
    const { classes, offer, onGoBack } = props;
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <IconButton className={classes.backButton} color="inherit" aria-label="Back" onClick={onGoBack}>
                    <ArrowBackIcon />
                </IconButton>
            </Toolbar>
            {offer && <OfferInfo {...props} />}
        </AppBar>
    );
}

function OfferInfo(props) {
    const { classes, offer } = props;
    const { jobCategoryKey, title } = offer;

    return (
        <div className={classes.container}>
            <Typography>
                <AssignmentIcon className={classes.icon} />
            </Typography>
            <Typography className={classes.category}>{jobCategoryKey}</Typography>
            <Typography variant="h2" className={classes.title}>
                {title}
            </Typography>
        </div>
    );
}

OfferBar.propTypes = {
    offer: PropTypes.object,
    classes: PropTypes.object.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default withStyles(styles)(OfferBar);
