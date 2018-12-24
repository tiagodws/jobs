import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/styles";
import React from "react";

const styles = {
    toolbar: {
        backgroundImage: "linear-gradient(329deg, #fdb49e, #ff8d6b)",
        color: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    backButton: {
        position: "absolute",
        top: 8,
        left: 8,
    },
    container: {
        textAlign: "center",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    icon: {
        fontSize: 30,
    },
    title: { marginTop: 0, color: "#ffffff", fontSize: "2.5rem", fontWeight: 500 },
    category: { fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 16 },
};

function OffersItemHero(props) {
    const { classes, offer, onGoBack } = props;
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <IconButton className={classes.backButton} color="inherit" aria-label="Back" onClick={onGoBack}>
                    <ArrowBackIcon />
                </IconButton>

                {offer && <OfferInfo {...props} />}
            </Toolbar>
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

export default withStyles(styles)(OffersItemHero);
