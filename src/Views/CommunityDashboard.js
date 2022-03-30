import React from "react";
import axios from "axios";
import './../Assets/communityDash.css';
import Chat from "../Components/Chat";
import Calendar from "../Components/Calendar";
import Announcements from "../Components/Announcements";

class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                CommunityID: undefined,
                CommunityName: undefined,
                LogoID: undefined,
                HeaderID: undefined,
                CommunityDescription: undefined,
                CommunityJoinCode: undefined,
                PrimaryColor: undefined,
                SecondaryColor: undefined,
            },
            isLoading: true
        }
    }

    async componentDidMount() {
        console.log("LOADING COMMUNITY");

        // Make API to get Community Data
        axios.post(('/getCommunityData'), {
            communityID: this.props.communityID,
        }).then((response) => {
            console.log(response.data[0]);
            this.setState({community: response.data[0], isLoading: false});
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            // Do Nothing
        }

        return (
            <div className="communityDash">
                <div className="communityHeader">
                    <div className="communityNav">
                        <a><img className="profilePic" src={this.props.userData.profileImgID} /></a>
                    </div>
                    <img src="https://cmshelpfiles.com/sites/support/uploads/images/tools_resources/image_ratios/horizontal-landscape.jpg" alt="Community Header" />
                    <div className="communityInfo">
                        <h2>{this.state.community.CommunityName}</h2>
                        <p>X Members</p>
                    </div>
                </div>
                <div className="communityDashContent">
                    <Calendar communityID={this.state.community.CommunityID } />
                    <Chat userData={this.props.userData.uid} communityData={this.state.community} />
                    <Announcements communityID={this.state.community.CommunityID } />
                </div>
            </div>
        )
    }
}

export default CommunityDashboard;