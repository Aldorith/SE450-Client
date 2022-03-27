import React from "react";
import axios from "axios";
import './../Assets/communityDash.css';
import Chat from "../Components/Chat";
import ManageCalendar from "../Components/manageCalendar";
import MangeAnnouncements from "../Components/mangeAnnouncements";

class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                communityID: undefined,
                communityName: undefined,
                logoID: undefined,
                headerID: undefined,
                communityDescription: undefined,
                communityJoinCode: undefined,
                primaryColor: undefined,
                secondaryColor: undefined,
            }
        }
    }

    componentDidMount() {
        // Make API to get Community Data
        axios.post(('http://localhost:8900/getCommunityData'), {
            communityID: this.props.communityID,
        }).then((response) => {
            console.log(response.data[0]);
            this.setState({community: response.data[0]});
        }).catch(function (error) {
            console.log(error);
        });
    }

    loadCalendar(){
        //this.setState({components: {showCalendar: true}});
        console.log("Trying to Load Community #" + this.communityID + " ManageCalendar");
        return <ManageCalendar communityID={this.communityID } />;
    }

    loadAnnouncements(){
        //this.setState({components: {showAnnouncements: true}});
        console.log("Trying to Load Community #" + this.communityID + " MangeAnnouncements");
        return <MangeAnnouncements communityID={this.communityID } />;
    }

    render() {
        return (
            <div className="communityDash">
                <div className="communityHeader">
                    <img src="https://cmshelpfiles.com/sites/support/uploads/images/tools_resources/image_ratios/horizontal-landscape.jpg" alt="Community Header" />
                    <div className="communityInfo">
                        <h2>{this.state.community.CommunityName}</h2>
                        <p>X Members</p>
                    </div>
                </div>
                <div className="communityCalendar">
                    <button onClick={this.loadCalendar}>Display Calendar</button>
                </div>
                <div className="communityAnnouncements">
                    <button onClick={this.loadAnnouncements}>Display Announcements</button>
                </div>
                <div className="communityDash">
                    <Chat userData={this.props.userData.uid} communityData={this.state.community} />
                </div>
            </div>
        )
    }
}

export default CommunityDashboard;