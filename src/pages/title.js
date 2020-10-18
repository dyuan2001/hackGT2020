import React from 'react';
import {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Button} from "@material-ui/core";

class home extends Component {
    handleClick() {
        console.log("toMessengerClicked");
        window.location.href = "/messenger"
    }
    render() {
        return(
            <Button 
            variant="outlined"
            onClick={this.handleClick}>To Messenger</Button>
        )
    }
}

export default home;