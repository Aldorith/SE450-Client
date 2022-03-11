import React from "react";
import axios from "axios";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    ComponentDidMount() {
        axios.post(('http://localhost:8900/getMessageData'), {
            commId: this.props.userData.uid,
            chanId: this.state.communityName,
        }).then(function (response) {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({messages: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    messageData = {
        username: messages[0],
        messageText: null,
        messageTime: null,
    }




    render() {

    }
}