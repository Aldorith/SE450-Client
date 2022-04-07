import React from "react";
import axios from "axios";
import './../Assets/Announcements.css';

class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.directoryListRef = React.createRef();
        this.state = {
            adminUsers: [],
            bannedUsers: [],
            generalUsers: [],
            isLoading: true
        };
    }

    async componentDidMount(){
        console.log("Loading Directory Information for Community: " + this.communityID);
        console.log("Loading General User Info");
        axios.post(('/loadDirectoryUsers'), {
            communityID: this.communityID,
            userID: this.userID
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({generalUsers: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });
        /*
        console.log("Loading Admin Users Info");
        axios.post(('/loadDirectoryAdmin'), {
            communityID: + this.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({adminUsers: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });

        console.log("Loading Banned Users Info");
        axios.post(('/loadDirectoryBanned'), {
            communityID: + this.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({bannedUsers: response.data, isLoading: false})
        })
            .catch(function (error) {
                console.log(error);
            });
            */

    }

    render() {
        if(this.state.isLoading)
            return(
                <div className = "loadingDirectory">
                    Loading Directory
                </div>
            )

        return(
            <div className = "Directory">
                <p className = "DirectoryTitle">Community Announcements</p>
                        <ul className = "directoryList" ref = {this.directoryListRef}>
                            {this.state.generalUsers.map(generalUsers =>
                                (<li className = "directoryListItem" key={generalUsers.CommunityID.toString()}>
                                        <div className = "directoryItemBox">
                                            <p className = "directoryItem">
                                                <span className = "directoryMemberName">{generalUsers.UserID} </span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
            </div>
        )
    }



}


export default Directory;