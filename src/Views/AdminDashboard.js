import React from "react";
import axios from "axios";
import '../Assets/style.css';
import '../Assets/adminDash.css';
import announcements from "../Components/Announcements";
import CreateChatChannel from "../Components/CreateChatChannel";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Can we delete this block?
            CommunityName: undefined,
            LogoID: undefined,
            HeaderID: undefined,
            CommunityDescription: undefined,
            CommunityJoinCode: undefined,
            PrimaryColor: undefined,
            SecondaryColor: undefined,

            announcementTitle: undefined,
            announcementDesc: undefined,

            calendarEventName: undefined,
            calendarEventDesc: undefined,
            calendarEventDay: undefined,
            calendarEventLocation: 'Unknown',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createAnnouncement = this.createAnnouncement.bind(this);
        this.createCalendarEvent = this.createCalendarEvent.bind(this);
    }

    componentDidMount() {
        this.setState({
            tempCommunityName: this.props.community.CommunityName,
            tempCommunityDesc: this.props.community.CommunityDescription,
            tempCommunityRules: this.props.community.CommunityRules,
        });
    }

    // simple updater
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onFileChange(e) {
        this.setState({file:e.target.files[0]});
    }

    // this does nothing right now
    updateRules(e) {
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Attempting to Update Community: " + this.props.community.communityName);

    }

    createAnnouncement(e) {
        e.preventDefault(); // This prevents the page from refreshing

        axios.post(('/createAnnouncement'), {
            communityID: this.props.userData.communities[0].CommunityID,
            announcementTitle: this.state.announcementTitle,
            announcementContents: this.state.announcementDesc
        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    createCalendarEvent(e) {
        e.preventDefault(); // This prevents the page from refreshing


        axios.post(('/createCalendarEvent'), {
            communityID: this.props.community.CommunityID,
            eventTitle: this.state.calendarEventName,
            eventDescription: this.state.calendarEventDesc,
            eventDateTime: this.state.calendarEventDay,
            eventLocation: this.state.calendarEventLocation
        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="adminDash">
                <div className="item1">
                    <h2>Community Settings</h2>
                    <form onSubmit={this.updateRules}>
                        <label>Community Display Name</label>
                        <input value={this.state.tempCommunityName} type="text" name="tempCommunityName"
                               onChange={this.handleInputChange} required=""/>

                        <label>Community Description</label>
                        <textarea value={this.state.tempCommunityDesc} name="tempCommunityDesc"
                               onChange={this.handleInputChange} />

                        <label>Community Rules</label>
                        <textarea id="rules" value={this.state.tempCommunityRules} name="tempCommunityRules"
                               onChange={this.handleInputChange}/>

                        <label>Community Header Image</label>
                        <input type="file" onChange= {this.onFileChange} />

                        <input type="Submit" value="Save"/>

                    </form>
                </div>
                <div className="item2">
                    <h2>Post an Announcement</h2>
                </div>
                <div className="item3">
                    <h2>Create an Event</h2>
                </div>

            </div>
        );
    }
}
export default AdminDashboard;