import React from "react";
import CommunityCreator from "../Views/CommunityCreator";
import UserDashboard from "../Views/UserDashboard";
import axios from "axios";

class CreateChatChannel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.addChannel = this.addChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    };

    addChannel(event) {

    }

    deleteChannel(event) {

    }

    handleTextChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="channelCreator">

            </div>
        )

    }
}