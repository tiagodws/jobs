import { Typography } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { withStyles } from "@material-ui/styles";
import React from "react";
import EarningInfo from "../../../../../../components/earning-info";

const styles = {
    container: {
        display: "flex",
        padding: 16,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(329deg, #fdb49e, #ff8d6b)",
        textAlign: "center",
    },
    icon: {
        fontSize: 30,
    },
    title: { marginTop: 0, color: "#ffffff", fontSize: "2.5rem", fontWeight: 500 },
    category: { fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 16 },
};

function OffersItemHero(props) {
    const { classes, offer } = props;
    const { jobCategoryKey, title, earningTotal, earningHourly } = offer;
    return (
        <div className={classes.container}>
            <Typography>
                <AssignmentIcon className={classes.icon} />
            </Typography>
            <Typography className={classes.category}>{jobCategoryKey}</Typography>
            <Typography variant="h2" className={classes.title} gutterBottom>
                {title}
            </Typography>
            <EarningInfo earningTotal={earningTotal} earningHourly={earningHourly} />
        </div>
    );
}

export default withStyles(styles)(OffersItemHero);
