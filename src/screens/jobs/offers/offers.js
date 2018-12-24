import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import OffersItem from "./components/offers-item";
import { fetchOffers } from "../../../shared/api";

class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            loading: false,
            error: undefined,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetchOffers()
            .then(({ response, body }) => {
                if (response.ok) this.setState({ offers: body.offers, loading: false, error: false });
                else throw body.error;
            })
            .catch(error => this.setState({ error, loading: false }));
    }

    render() {
        const { loading, error, offers } = this.state;

        if (loading) return <CircularProgress color="secondary" />;
        else if (error) return <span>Error State</span>;
        else if (!loading && !offers.length) return <span>Empty State</span>;
        return (
            <Grid container spacing={16} justify="center" alignItems="center">
                {offers.map(offer => (
                    <Grid key={offer.id} item xs={12}>
                        <OffersItem offer={offer} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default Offers;
