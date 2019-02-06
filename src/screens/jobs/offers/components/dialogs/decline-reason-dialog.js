import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";

import ErrorState from "../../../../../components/error-state";
import LoadingState from "../../../../../components/loading-state";
import { fetchDeclineReasons } from "../../../../../shared/api";

class DeclineReasonDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reason: undefined,
            reasons: [],
            loading: true,
            error: undefined,
        };

        this.handleTryAgain = this.handleTryAgain.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { open } = nextProps;
        if (open) this.loadData();
    }

    loadData() {
        this.setState({ loading: true, error: undefined, reasons: [] });
        fetchDeclineReasons()
            .then(({ response, body }) => {
                if (response.ok) this.setState({ reasons: body.reasons, loading: false });
                else throw body.error;
            })
            .catch(error => this.setState({ error, loading: false }));
    }

    handleTryAgain() {
        this.loadData();
    }

    handleReasonChange(event) {
        const { target } = event;
        const { value } = target;

        this.setState({ reason: value });
    }

    render() {
        const { open, onClose } = this.props;
        const { loading, error, reason, reasons } = this.state;

        if (!open) return null;

        return (
            <Dialog open={open} onClose={() => onClose(reason)} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Why dont you want this job?</DialogTitle>

                <DialogContent>
                    {loading && <LoadingState />}

                    {error && <ErrorState onTryAgain={this.handleTryAgain} />}

                    {!loading && !error && (
                        <RadioGroup aria-label="Reasons" value={reason} onChange={this.handleReasonChange}>
                            {reasons.map(reason => (
                                <FormControlLabel key={reason.name} value={reason.name} control={<Radio />} label={reason.label} />
                            ))}
                        </RadioGroup>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose()} color="primary">
                        Go back
                    </Button>

                    <Button onClick={() => onClose(reasons.find(({ name }) => reason === name))} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DeclineReasonDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeclineReasonDialog;
