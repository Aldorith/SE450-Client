import React from "react";
import axios from "axios";
import './../Assets/chat.css';
//import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            messages: [],
            messageText: '',
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.changeChat = this.changeChat.bind(this);

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
        axios.post(('/sendMessage'), {
            messageID: this.state.messages[this.state.messages.length-1].uniqueID+1,
            chanID: 1,//this.state.chanID[0],
            commID: this.props.communityData.CommunityID,
            uid: this.props.userData.uid,
            messageText: this.state.messageText,
            messageDateTime: that.getDateTime(),
        }).then(function (response) {
            console.log(response.data);
            that.state.messages = (previousState => ({
                messages: [...previousState.messages, response.data]
            }));
        })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    async componentDidMount() {

        axios.post(('/getChannelData'), {
            commID: this.props.communityData.CommunityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({channels: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });

        axios.post(('/getMessageData'), {
            commID: this.props.communityData.CommunityID,
            chanID: 1,//this.state.channels[0],
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

    changeChat(event) {
        const target = event.target;
        const value = target.value;

        axios.post(('http://localhost:8900/getMessageData'), {
            commID: this.props.communityData.CommunityID,
            chanID: value,
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

    render() {
        return(
            <div className = "chatComponent">
                <p className = "chatTitle">Chat</p>
            <div className = "messagesDisplay">
                <select name = "channels" id = "channels" className = "channelSelect" onChange = {this.changeChat}>
                    {this.state.channels.map(channel => (<option value = {channel.ChannelID} key = {channel.ChannelID}>{channel.ChannelName}</option>))}
                </select>
                <div className = "messages">
                <ul className = "messageList">
                    {this.state.messages.map((message) =>
                        <li className = "messageListItem" key={message.uniqueID.toString()}><div><p className = "messageText"><span className = "username">{message.UserName}
                        </span>    <span className = "timestamp">{message.MessageDateTime}<br/></span>{message.MessageText}</p></div></li>
                    )}
                </ul>
                </div>
                <form className = "messageEntry" onSubmit={this.handleMessageSubmit}>
                    <label className = "submitLabelText">
                        Enter Message:
                        <input type="text" value={this.state.messageText} name="messageText" onChange={this.handleMessageChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                    {this.state.errorMessage && (
                        <p className="error"> {this.state.errorMessage}</p>
                    )}
                </form>
            </div>
            </div>
        )
    }
}
export default Chat;