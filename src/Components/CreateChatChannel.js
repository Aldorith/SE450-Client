import React from "react";
import CommunityCreator from "../Views/CommunityCreator";
import UserDashboard from "../Views/UserDashboard";
import AdminDashboard from "../Views/AdminDashboard";
import axios from "axios";

class CreateChatChannel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            chanID: 1,
            errorMessage1: '',
            errorMessage2: '',
            successMessage: '',
            channelName:'',
            uniqueName: true,
            isLoading: true,
        }

        this.addChannel = this.addChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.selectChat = this.selectChat.bind(this);
    };

    async componentDidMount() {
        this.state.successMessage = '';
        console.log('Getting Channel Data For '+this.props.communityData.CommunityID);
        axios.post(('/getChannelData'), {
            commID: this.props.communityData.CommunityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data);
            this.setState({channels: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    addChannel(event) {
        event.preventDefault();
        let that = this;
        this.setState({errorMessage1: ''});
        if(that.state.channelName === '' || that.state.channelName===''){}
        else {
            this.state.channels.forEach(element => {
                if (element.ChannelName === this.state.channelName) {
                    this.setState({uniqueName: false})
                }
            })
            if (this.state.uniqueName) {
                axios.post(('/addChannel'), {
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
            }
            else
            {
                if(!this.state.uniqueName)
                    that.setState({errorMessage1: 'New Channel Name Must Be Unique', uniqueName: true})
                else
                    that.setState({errorMessage1: '20 Character Channel Name Max'})
        }
        }
    }

    deleteChannel(event) {
        event.preventDefault();
        let that = this;
        if(this.state.channels.length > 1) {
            this.setState({errorMessage2:''});
            axios.post(('/deleteChannel'), {
                commID: that.props.communityData.CommunityID,
                chanID: that.state.chanID,
            }).then((response) => {
                //This is where the response is handled from the server
                console.log(response.data[0]);
                that.setState({channels: response.data})
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.setState({successMessage: 'Channel added successfully!', channelName: ''})
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
                <label className= "channelMainHeader">Modify Community Channels</label>
                <div className="channelCreator">
                    <form className="newChannel" onSubmit={this.addChannel}>
                        <label className="newChannelTextLabel">Enter a Name for a New Channel: <input type="text" value={this.state.channelName} name="channelName"
                                   onChange={this.handleTextChange}/>
                        </label>
                        <div><input type="submit" value="Create" className="createButton"/>{this.state.errorMessage1 && (
                            <p className="error"> {this.state.errorMessage1}</p>)}</div>
                    </form>
                </div>
                <div className="channelDelete"><form className="deleteChannel" onSubmit={this.deleteChannel}><label className="channelSelect">Select a Channel to Delete: </label
                ><select name="channels" id="channels" className="channelSelect" onChange={this.selectChat}>
                    {this.state.channels.map(channel => (
                        <option value={channel.ChannelID} key={channel.ChannelID}>{channel.ChannelName}</option>))}
                </select><input type="submit" value="Delete" className="deleteButton"/>{this.state.errorMessage2 && (
                    <p className="error"> {this.state.errorMessage2}</p>)}{this.state.successMessage && (
                    <p className="success"> {this.state.successMessage}</p>)}
                </form></div>
            </div>
        )
    }
}
export default CreateChatChannel;