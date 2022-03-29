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
//        this.ChannelDropdownList = this.ChannelDropdownList.bind(this);
  //      this.DropdownOption = this.DropdownOption.bind(this);
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
            chanID: 1,//this.state.chanID[0],
            commID: this.props.communityData.CommunityID,
            uid: 4, //this.props.userData.uid,
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

    componentDidMount() {

        axios.post(('http://localhost:8900/getChannelData'), {
            commID: 1,//this.props.communityData.CommunityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            console.log("Hello")
            this.setState({channels: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });

        axios.post(('http://localhost:8900/getMessageData'), {
            commID: 1,//this.props.communityData.CommunityID,
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

    /*
    DropdownOption() {
        return <option>{this.state.channels.channelName}</option>
    }

    ChannelDropdownList() {
        const channels = this.state.channels;
        const channelListItems = channels.map((channels) =>
            <this.DropdownOption key = {channels.channelID} value = {channels}/>
        );
        return(
        <optgroup label = "Channels">{channelListItems}</optgroup>
        );
    }

    {channels.channelName.map(channel => {return (<option value = {channel}> {channel} </option>)})}
    */

    render() {
        const {channels} = this.state.channels;
        return(
            <div className = "messagesDisplay">
                <select name = "channels" id = "channels" className = "channelSelect" >
                    {this.state.channels.map(channelName => (<option>{channelName.ChannelName}</option>))}
                </select>
                <ul className = "messageList">
                    {this.state.messages.map((message) =>
                        <li className = "messageListItem" key={message.uniqueID.toString()}><div><p className = "messageText"><span className = "username">{message.UserName}
                        </span>    <span className = "timestamp">{message.MessageDateTime}<br/></span>{message.MessageText}</p></div></li>
                    )}
                </ul>
                <form onSubmit={this.handleMessageSubmit}>
                    <label>
                        Enter Message:
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