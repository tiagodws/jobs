import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOffer } from "../../actions";
import { withRouter } from "react-router";

class OfferDetail extends Component {
    componentDidMount() {
        console.log("oi")
        // const { id } = this.props.match.params;
        // this.props.fetchOffer(id);
    }

    render() {
        const { offerDetail } = this.props;
        console.log(this.props);
        // const { loading, error, offer } = offerDetail;
        return "Oi";
        // if (loading) return <CircularProgress color="secondary" />;
        // else if (error) return <span>Error State</span>;
        // else if (!offer) return <span>Empty State</span>;
        // return <div>Offer {offer.id}</div>;
    }
}

function mapStateToProps({ offerDetail }) {
    return {
        offerDetail,
    };
}

// const WithRouter = withRouter(OfferDetail);

export default connect(
    mapStateToProps,
    { fetchOffer }
)(OfferDetail);
