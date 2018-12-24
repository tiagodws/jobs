import { Button, Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";

import { getSearchUrl } from "../shared/maps";

function LocationInfo(props) {
    const { location } = props;
    const { locationSearchString } = location;

    return (
        <Fragment>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="overline">Location</Typography>
                </Grid>

                <Grid container item spacing={8} xs={12}>
                    <Grid container item alignItems="center" xs={8}>
                        <Typography variant="body1">{locationSearchString}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Button href={getSearchUrl(locationSearchString)} target="_blank" variant="contained" color="secondary" fullWidth>
                            Maps
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default LocationInfo;
