import React from "react";
import axios from "axios";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        axios.post(('http://localhost:8900/getMessageData'), {
            commId: 1,
            chanId: 1,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            let i = 0;
            response.data.forEach(element => {
                    element.uniqueID = i;
                    i += 1;
                }
            );


            this.setState({messages: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    /*
    messageData = {
        username: messages[0],
        messageText: null,
        messageTime: null,
    }
    */


    render() {
        return(
            <div>
                <ul>
                    {this.state.messages.map((message) =>
                        <li key={message.uniqueID.toString()}>
                            <p>{message.MessageText}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Chat;