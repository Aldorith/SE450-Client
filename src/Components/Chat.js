import React from "react";
import axios from "axios";
import './../Assets/chat.css';
import io from "socket.io-client";
//import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.messageListRef = React.createRef();
        this.state = {
            isLoading: true,
            channels: [],
            messages: [],
            messageText: '',
            chanID: 1,
            errorMessage: ''
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.changeChat = this.changeChat.bind(this);
        //this.updateScroll = this.updateScroll.bind(this);
        this.getDateTime = this.getDateTime.bind(this);
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
            chanID: this.state.chanID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            let i = 0;
            response.data.forEach(element => {
                    element.uniqueID = i;
                    i += 1;
                }
            );
            this.setState({messages: response.data, isLoading: false})
        })
            .catch(function (error) {
                console.log(error);
            });

        /*
        const socket = io(':8900');
        console.log(socket);
        console.log("BEFORE!!")
        socket.on("connect", () => {
            console.log(socket.id);
        });
         */
        console.log("AFTER!!")
    }

    getDateTime() {
        let nowDateTime = new Date();
        return `${nowDateTime.getFullYear()}-${nowDateTime.getMonth() + 1}-${nowDateTime.getDate()} ${nowDateTime.getHours()}:${nowDateTime.getMinutes()}:${nowDateTime.getSeconds()}`;
    }

    handleMessageChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleMessageSubmit(event){
        event.preventDefault();
        if(this.state.messageText === '')
            this.setState({errorMessage: ''})
        else if(this.state.messageText.length >= 150)
        {
            this.setState({errorMessage: 'Too long: Maximum 150 Characters'})
        }
        else {
            let that = this;
            if (!that.state.messages) {
                that.state.messages[0] = {
                    UserName: that.props.userData.username,
                    MessageText: that.state.messageText,
                    MessageDateTime: that.getDateTime(),
                    messageID: 0,
                    uniqueID: -1,
                }
                console.log(that.state.messages[0]);
            }
            else{
                that.state.messages.push({
                    UserName: that.props.userData.username,
                    MessageText: that.state.messageText,
                    MessageDateTime: that.getDateTime(),
                    messageID: 0,
                    uniqueID: that.state.messages[that.state.messages.length-1].uniqueID + 1,
                })
            }
            //Store Message on Server, and display new message
            // Make API call to web server
            axios.post(('/sendMessage'), {
                messageID: that.state.messages[that.state.messages.length - 1].uniqueID + 1,
                chanID: that.state.chanID,
                commID: that.props.communityData.CommunityID,
                uid: that.props.userData.uid,
                messageText: that.state.messageText,
                messageDateTime: that.getDateTime(),
            }).then(function (response) {
                //This is where the response is handled from the server
                console.log("vvvv");
                console.log(response.data[0]);
                console.log("^^^^");
                let i = 0;
                response.data.forEach(element => {
                        element.uniqueID = i;
                        i += 1;
                    }
                );
                that.state.messages = response.data
            })
                .catch(function (error) {
                    console.log(error);
                });

            //Refresh the messages shown here...
            this.setState({messageText: '', errorMessage: ''});
            //this.updateScroll();
        }
    }

    changeChat(event) {
        const target = event.target;
        const value = target.value;
        this.setState({chanID: value});

        axios.post(('/getMessageData'), {
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
        this.updateScroll();
    }
/*
    updateScroll = () => {
        console.log("HELLO")
        const scrollHeight = this.messageListRef.scrollHeight;
        const height = this.messageListRef.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageListRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
 */

    render() {
        if(this.state.isLoading)
            return(
                <div></div>
            )
        return(
            <div className = "chatComponent">
                <p className = "chatTitle">Chat</p>
                <div className= "chatBox"><div className = "messagesDisplay">
                        <label className = "channelSelect">Channel: </label>
                        <select name = "channels" id = "channels" className = "channelSelect" onChange = {this.changeChat}>
                            {this.state.channels.map(channel => (<option value = {channel.ChannelID} key = {channel.ChannelID}>{channel.ChannelName}</option>))}
                        </select><div className = "messages"><ul className = "messageList" ref = {this.messageListRef}>
                                {this.state.messages.map(message =>
                                    (<li className = "messageListItem" key={message.uniqueID.toString()}><div><p className = "messageText"><span className = "username">{message.UserName}
                        </span>    <span className = "timestamp">{message.MessageDateTime}<br/></span>{message.MessageText}</p></div></li>
                                    ))}
                    </ul></div><div className= "sendMessageSection"><form className = "messageEntry" onSubmit={this.handleMessageSubmit}>
                                <label className = "submitLabelText">
                                    Enter Message:
                                    <input type="text" value={this.state.messageText} name="messageText" onChange={this.handleMessageChange}/>
                                </label><div><input type="submit" value="Send" className = "messageSendButton" />{this.state.errorMessage&&(<p className="error"> {this.state.errorMessage}</p>)}</div>
                </form></div></div></div></div>
        )
    }
}
export default Chat;