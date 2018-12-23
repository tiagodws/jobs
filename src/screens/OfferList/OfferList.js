import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import Offer from "../../components/Offer";
import { fetchOffers } from "../../actions";

class OfferList extends Component {
    componentDidMount() {
        this.props.fetchOffers();
    }

    render() {
        const { offerList } = this.props;
        const { loading, error, offers } = offerList;

        if (loading) return <CircularProgress color="secondary" />;
        else if (error) return <span>Error State</span>;
        else if (!offers.length) return <span>Empty State</span>;
        return (
            <Grid container spacing={16} justify="center" alignItems="center">
                {offers.map(offer => (
                    <Grid key={offer.id} item xs={12}>
                        <Offer offer={offer} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

function mapStateToProps({ offerList }) {
    return {
        offerList,
    };
}

export default connect(
    mapStateToProps,
    { fetchOffers }
)(OfferList);
