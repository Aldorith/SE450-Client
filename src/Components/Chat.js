import React from "react";
import axios from "axios";
import './../Assets/chat.css';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chanID: 1,
            messages: [],
            messageText: '',
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);

    }

    getDateTime() {
        let nowDateTime = new Date();
        return `${nowDateTime.getFullYear()}-${nowDateTime.getMonth() + 1}-${nowDateTime.getDate()} ${nowDateTime.getHours()}:${nowDateTime.getMinutes()}:${nowDateTime.getSeconds()}`;
    }


    handleMessageChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleMessageSubmit(event){
        let that = this;
        //Store Message on Server, and display new message
        // Make API call to web server
        axios.post(('http://localhost:8900/sendMessage'), {
            messageID: this.state.messages[this.state.messages.length-1].uniqueID+1,
            chanID: 1,//this.state.chanID,
            commID: 1,//this.props.communityData.commID,
            uid: 4, //this.props.userData.uid,
            messageText: this.state.messageText,
            messageDateTime: that.getDateTime(),
        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    componentDidMount() {
        axios.post(('http://localhost:8900/getMessageData'), {
            commID: 1, //this.props.commID,
            chanID: 1, //this.state.chanID,
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
            <div className = "messagesDisplay">
                <select name = "channels" id = "channels" className = "channelSelect" >
                    <option value = "channel_1">
                        ChannelName_1
                    </option>
                    <option value = "channel_2">
                        ChannelName_2
                    </option>
                </select>
                <ul className = "messageList">
                    {this.state.messages.map((message) =>
                        <li className = "messageListItem" key={message.uniqueID.toString()}><div><p className = "messageText"><span className = "username">{message.UserName}
                        </span>    <span className = "timestamp">{message.MessageDateTime}<br/></span>{message.MessageText}</p></div></li>
                    )}
                </ul>
                <form onSubmit={this.handleMessageSubmit}>
                    <label>
                        Enter Community Join Code:
                        <input type="text" value={this.state.messageText} name="messageText" onChange={this.handleMessageChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                    {this.state.errorMessage && (
                        <p className="error"> {this.state.errorMessage}</p>
                    )}
                </form>
            </div>
        )
    }
}
export default Chat;