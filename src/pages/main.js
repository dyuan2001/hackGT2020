import React from 'react';
import {Component} from 'react';
import {Button} from "@material-ui/core";

//Main
class messenger extends Component {
    handleClick() {
        console.log("Back to home clicked");
        window.location.href = "/";
    }
    render() {
        return (
            <h1>Messenger Module goes here
                <Button
                variant="outlined"
                onClick= {this.handleClick}>Back to Home
                </Button>
            </h1>

        )
    }
}

export default messenger