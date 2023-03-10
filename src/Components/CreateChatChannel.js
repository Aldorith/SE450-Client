import React from "react";
import CommunityCreator from "../Views/CommunityCreator";
import UserDashboard from "../Views/UserDashboard";
import AdminDashboard from "../Views/AdminDashboard";
import Chat from "../Components/Chat"
import axios from "axios";

class CreateChatChannel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            chanID: '',
            errorMessage1: '',
            errorMessage2: '',
            successMessage1: '',
            successMessage2: '',
            channelName:'',
            uniqueName: true,
            isLoading: true,
        }

        this.addChannel = this.addChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.selectChat = this.selectChat.bind(this);
        this.checkText = this.checkText.bind(this);
    };

    async componentDidMount() {
        this.state.successMessage = '';
        let that = this;
        console.log('Getting Channel Data For '+this.props.communityData.CommunityID);
        axios.post(('https://trivia.skybounddev.com/getChannelData'), {
            commID: this.props.communityData.CommunityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data);
            that.setState({channels: response.data, chanID: response.data[0].ChannelID})
        })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({isLoading: false});
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

    addChannel(event) {
        event.preventDefault();
        let that = this;
        this.setState({errorMessage1: '', uniqueName: true, successMessage1: ''});
        if(that.state.channelName === ''){
            that.setState({errorMessage1: 'New Channel Must Be Named'})
        }
        else {
            this.state.channels.forEach(element => {
                if (element.ChannelName === this.state.channelName) {
                    this.state.uniqueName = false;
                }
            })
            if ((this.state.uniqueName=== true) && (this.state.channelName.length < 21)) {
                that.state.channelName = that.checkText(that.state.channelName);
                axios.post(('https://trivia.skybounddev.com/addChannel'), {
                    commID: that.props.communityData.CommunityID,
                    channelName: that.state.channelName,
                }).then((response) => {
                    //This is where the response is handled from the server
                    console.log(response.data[0]);
                    that.setState({channels: response.data, channelName: ''})
                })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.setState({successMessage1: 'Channel added successfully!', channelName: ''})
            }
            else
            {
                if(this.state.uniqueName === false)
                    that.setState({errorMessage1: 'New Channel Name Must Be Unique', uniqueName: true})
                else
                    that.setState({errorMessage1: '20 Character Channel Name Max'})
        }
        }
    }

    deleteChannel(event) {
        event.preventDefault();
        let that = this;
        this.setState({successMessage2:'', errorMessage: ''});
        if(this.state.channels.length > 1) {
            this.setState({errorMessage2:''});
            let channelsTemp = this.state.channels;
            axios.post(('https://trivia.skybounddev.com/deleteChannel'), {
                commID: that.props.communityData.CommunityID,
                chanID: that.state.chanID,
            }).then((response) => {
                //This is where the response is handled from the server
                console.log(response.data[0]);
                that.setState({channels: response.data, chanID: response.data[0].ChannelID})
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.setState({successMessage2: 'Channel deleted successfully!', channelName: ''});
        }
        else{
            this.setState({errorMessage2: 'There must remain at least one channel'})
        }
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

    selectChat(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        console.log('vvvvvvvvv')
        console.log(value);
        this.setState({chanID: value});
        console.log('^^^^^^^^^')
    }

    render() {
        return (
            <div className="channelAdmin">
                <h2>Modify Community Channels</h2>
                <div>
                    <form onSubmit={this.addChannel}>
                        <label>Enter a Name for a New Channel: <input type="text" value={this.state.channelName} name="channelName"
                                   onChange={this.handleTextChange}/>
                        </label>
                        <div><input type="submit" value="Create"/>{this.state.errorMessage1 && (
                            <p className="error"> {this.state.errorMessage1}</p>)}{this.state.successMessage1 && (
                            <p className="success"> {this.state.successMessage1}</p>)}</div>
                    </form>
                </div>
                <div className="channelDelete"><form className="deleteChannel" onSubmit={this.deleteChannel}><label>Select a Channel to Delete: </label
                ><select name="channels" id="channels" className="channelSelect" onChange={this.selectChat}>
                    {this.state.channels.map(channel => (
                        <option value={channel.ChannelID} key={channel.ChannelID}>{channel.ChannelName}</option>))}
                </select><input type="submit" value="Delete" className="deleteButton"/>{this.state.errorMessage2 && (
                    <p className="error"> {this.state.errorMessage2}</p>)}{this.state.successMessage2 && (
                    <p className="success"> {this.state.successMessage2}</p>)}
                </form></div>
            </div>
        )
    }
}
export default CreateChatChannel;