import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";

class DeclineCommentDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: "",
        };

        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    handleCommentChange(event) {
        const { target } = event;
        const { value } = target;

        this.setState({ comment: value });
    }

    render() {
        const { open, onClose } = this.props;
        const { comment } = this.state;

        return (
            <Dialog
                open={open}
                onClose={() => onClose(comment)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Please enter your reason</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Reason"
                        type="text"
                        fullWidth
                        value={comment}
                        onChange={this.handleCommentChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose(comment)} disabled={!comment} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DeclineCommentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeclineCommentDialog;
