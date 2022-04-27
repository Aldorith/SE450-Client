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
            errorMessage: '',
            reloaded: true,
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.changeChat = this.changeChat.bind(this);
        //this.updateScroll = this.updateScroll.bind(this);
        this.getDateTime = this.getDateTime.bind(this);
        this.checkText = this.checkText.bind(this);
        this.getChannelData = this.getChannelData.bind(this);
        this.getMessageData = this.getMessageData.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    async componentDidMount() {
        this.getChannelData();
        this.getMessageData();
        /*
        const socket = io(':8900');
        console.log(socket);
        console.log("BEFORE!!")
        socket.on("connect", () => {
            console.log(socket.id);
        });
         */
        //console.log("AFTER!!")
    }

    getChannelData() {
        axios.post(('https://trivia.skybounddev.com/getChannelData'), {
            commID: this.props.communityData.CommunityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({channels: response.data, chanID: response.data[0].ChannelID});
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    getMessageData() {
        let that = this;
        axios.post(('https://trivia.skybounddev.com/getMessageData'), {
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
    }

    checkText(String) {
        let i = 0;
        let temp = '';
        while(i < String.length)
        {
            if(String[i] === "'")
            {
                temp+="\\"
            }
            temp+=String[i];
            i+=1;
        }
        String = temp;
        return String;
    }

    getDateTime() {
        let nowDateTime = new Date();
        let timeStamp = `${nowDateTime.getFullYear()}-${nowDateTime.getMonth() + 1}-${nowDateTime.getDate()} ${nowDateTime.getHours()}:${nowDateTime.getMinutes()}:${nowDateTime.getSeconds()}`;
        return timeStamp.toString();
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
            let tempText = this.checkText(this.state.messageText);
            console.log(this.state.messageText);
            console.log(this.state.messageText);
            let that = this;
            if (that.state.messages[0] === undefined) {
                that.state.messages[0] = {
                    UserName: that.props.userData.username,
                    MessageText: this.state.messageText,
                    MessageDateTime: that.getDateTime(),
                    MessageID: 0,
                    uniqueID: -1,
                }
                console.log(that.state.messages[0]);
            }
            else{
                that.state.messages.push({
                    UserName: that.props.userData.username,
                    MessageText: this.state.messageText,
                    MessageDateTime: that.getDateTime(),
                    MessageID: 0,
                    uniqueID: that.state.messages[that.state.messages.length-1].uniqueID + 1,
                })
            }
            //Store Message on Server, and display new message
            // Make API call to web server
            axios.post(('https://trivia.skybounddev.com/sendMessage'), {
                messageID: that.state.messages[that.state.messages.length - 1].uniqueID + 1,
                chanID: that.state.chanID,
                commID: that.props.communityData.CommunityID,
                uid: that.props.userData.uid,
                messageText: tempText,
                messageDateTime: that.getDateTime(),
            }).then(function (response) {
                //This is where the response is handled from the server
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
        console.log("Trying To Get Messages: "+value + "not" +this.state.chanID);
        axios.post(('https://trivia.skybounddev.com/getMessageData'), {
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
            this.setState({messages: response.data, isLoading: false})
        })
            .catch(function (error) {
                console.log(error);
            });
        //this.updateScroll();
    }

    deleteMessage(event) {
        event.preventDefault();
        let that = this;
        const target = event.target;
        const value = target.value;
        console.log("Value: "+value);

        axios.post(('https://trivia.skybounddev.com/deleteMessage'), {
            commID: that.props.communityData.CommunityID,
            chanID: that.state.chanID,
            messID: value,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            let i = 0;
            response.data.forEach(element => {
                    element.uniqueID = i;
                    i += 1;
                }
            );
            that.setState({messages: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });
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
                <div className= "chatBox">
                    <div className = "messagesDisplay">
                        <label className = "channelSelect">Channel: </label>
                        <select name = "channels" id = "channels" className = "channelSelect" onChange = {this.changeChat}>
                            {this.state.channels.map(channel => (<option value = {channel.ChannelID} key = {channel.ChannelID}>{channel.ChannelName}</option>))}
                        </select><div className = "messages">
                        <ul className = "messageList" ref = {this.messageListRef}>
                                {this.state.messages.map(message =>
                                    (<li className = "messageListItem" key={message.uniqueID.toString()}><div><p className = "messageText"><span className = "username">{message.UserName}
                        </span>    <span className = "timestamp">{new Date(message.MessageDateTime).toLocaleString()} {this.props.isAdmin && (<button className='deleteMessageText' value={message.MessageID} onClick={this.deleteMessage}>Delete</button>)}<br/></span>{message.MessageText}</p></div></li>
                                    ))}
                        </ul>
                    </div>
                        <div className= "sendMessageSection">
                            <form className = "messageEntry" onSubmit={this.handleMessageSubmit}>
                                <label className = "submitLabelText"> Enter Message: </label>
                                <input className = "messageEntryText" type="text" value={this.state.messageText} name="messageText" onChange={this.handleMessageChange}/>
                                <div>
                                    <input type="submit" value="Send" className = "messageSendButton" />{this.state.errorMessage&&(<p className="error"> {this.state.errorMessage}</p>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat;