import React from "react";
import axios from "axios";
import './../Assets/Directory.css';

class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.directoryListRef = React.createRef();
        this.state = {
            adminUsers: [],
            bannedUsers: [],
            generalUsers: [],
            isLoading: true,

            profilePhoto: undefined,
            profilePhotoHash: Date.now()
        };
    }

    async componentDidMount(){

        console.log("Loading Directory Information for Community: " + this.communityID);
        axios.post(('https://trivia.skybounddev.com/loadDirectory'), {
            communityID: this.props.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({generalUsers: response.data, isLoading: false})
        })
            .catch(function (error) {
                console.log(error);
            });
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
                <p className = "directoryTitle">Community Directory</p>
                        <ul className = "directoryList" ref = {this.directoryListRef}>
                            {this.state.generalUsers.map(generalUsers =>
                                (<li className = "directoryListItem" key={generalUsers.uid}>
                                        <div className = "directoryItemBox">
                                            <p className = "directoryItem">
                                                <img src={"https://trivia.skybounddev.com/profilePhotos/" + generalUsers.uid + ".png"}/>
                                                <span className = "directoryMemberName">{generalUsers.UserName} </span>
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