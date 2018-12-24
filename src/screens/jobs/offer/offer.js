import { Component } from "react";
import { withRouter } from "react-router";

class Offer extends Component {
    componentDidMount() {
        console.log("oi");
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
        // return <div>offer {offer.id}</div>;
    }
}

export default withRouter(Offer);
