import React from "react";
import axios from "axios";
import '../Assets/adminDash.css';
import announcements from "../Components/Announcements";
import CreateChatChannel from "../Components/CreateChatChannel";
// Original adminDashboard.css here: https://pastebin.com/ckdnnSz1

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Can we delete this block?
            tempCommunityName: '',
            tempCommunityDesc: '',
            tempCommunityRules: '',
            tempIcon: '',
            tempHeader: '',

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
        this.updateCommunity = this.updateCommunity.bind(this);
        this.uploadIcon = this.uploadIcon.bind(this);
        this.uploadHeader = this.uploadHeader.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
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
        this.setState({[e.target.name]:e.target.files[0]});
        console.log("Updated " + e.target.name);
    }

    // this does nothing right now
    updateCommunity(e) {
        e.preventDefault(); // This prevents the page from refreshing

        axios.post(('/updateCommunity'), {
            communityID: this.props.community.CommunityID,
            communityName: this.state.tempCommunityName,
            communityDesc: this.state.tempCommunityDesc,
            communityRules: this.state.tempCommunityRules,
        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });

        // Upload Icon if File Uploaded
        if (this.state.tempIcon !== '') {
            this.uploadIcon();
        }

        // Upload Header if File Uploaded
        if (this.state.tempHeader !== '') {
            this.uploadHeader();
        }

        console.log("Attempting to Update Community: " + this.props.community.communityName);

        // Reset Input Fields
        this.setState({
            tempIcon: '',
            tempHeader: ''
        })

        // TODO Display Success Message

    }

    uploadIcon() {
        console.log("Trying to Upload Icon");

        const formData = new FormData();
        formData.append('CommunityID', this.props.community.CommunityID);
        formData.append('communityIcon',this.state.tempIcon);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/uploadCommunityIcon", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            console.log("ERROR:  " + error);
        });
    }

    uploadHeader() {
        const formData = new FormData();
        formData.append('CommunityID', this.props.community.CommunityID);
        formData.append('communityHeader',this.state.tempHeader);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/uploadCommunityHeader", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            console.log("ERROR:  " + error);
        });
    }

    createAnnouncement (e) {
        e.preventDefault(); // This prevents the page from refreshing
        console.log("Attempting to Create a New Announcement: " + this.state.announcementTitle);

        axios.post(('/createAnnouncement'), {
            communityID: this.props.community.CommunityID,
            announcementTitle: this.state.announcementTitle,
            announcementDesc: this.state.announcementDesc
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

    closeAdminDash() {
        // Get the modal
        let modal = document.getElementById("adminModal");

        modal.style.display = "none";
    }

    render() {
        return (
            <div className="adminDash">
                <div className='closeButton'>
                    <a onClick={this.closeAdminDash}>X</a>
                </div>
                <div className="item1">
                    <h2>Community Settings</h2>
                    <form onSubmit={this.updateCommunity}>
                        <label>Community Display Name</label>
                        <input value={this.state.tempCommunityName} defaultValue={this.props.community.communityName} type="text" name="tempCommunityName"
                               onChange={this.handleInputChange} required=""/>

                        <label>Community Description</label>
                        <textarea value={this.state.tempCommunityDesc} defaultValue={this.props.community.communityDesc} name="tempCommunityDesc"
                               onChange={this.handleInputChange} />

                        <label>Community Rules</label>
                        <textarea id="rules" value={this.state.tempCommunityRules} defaultValue={this.props.community.communityRules} name="tempCommunityRules"
                               onChange={this.handleInputChange}/>

                        <label>Community Icon</label>
                        <input type="file" name="tempIcon" onChange={this.onFileChange} />

                        <label>Community Header Image</label>
                        <input type="file" name="tempHeader" onChange={this.onFileChange} />

                        <input type="Submit" value="Save"/>

                    </form>
                </div>
                <div className="item2">
                    <h2>Post an Announcement</h2>
                    <form id = {"announcementForm"} onSubmit={this.createAnnouncement} name="form-1" style={{padding: '10px'}}>
                        <label>Post Title</label>
                        <input value={this.state.announcementTitle} type="text" placeholder="Post Title" id="name-269c" name="announcementTitle" onChange={this.handleInputChange} required=""/>
                        <label>Post Content</label>
                        <textarea value={this.state.announcementDesc} placeholder="..." rows="3" cols="50" id="message-269c" name="announcementDesc" onChange={this.handleInputChange} required=""/>
                        <input type="submit" value="Post"/>
                    </form>

                </div>
                <div className="item3">
                    <h2>Create an Event</h2>
                    <form id = "eventForm" onSubmit={this.createCalendarEvent} name="form-2" style={{padding: '10px'}}>
                        <label>Event Title</label>
                        <input value={this.state.calendarEventName} type="text" placeholder="Event Title" id="name-8220" name="calendarEventName" onChange={this.handleInputChange} required=""/>

                        <label>Date &amp; Time</label>
                        <input value={this.state.calendarEventDay} type="datetime-local" placeholder="1/1/2022 - 5 PM" id="date-8220" name="calendarEventDay" onChange={this.handleInputChange} required=""/>

                        <label>Event Description</label>
                        <textarea value={this.state.calendarEventDesc} placeholder="..." rows="3" cols="50" id="message-8220" name="calendarEventDesc" onChange={this.handleInputChange} required=""/>

                        <label>Event Location</label>
                        <input value={this.state.calendarEventLocation} type="text" placeholder="Room 1" name="calendarEventLocation" onChange={this.handleInputChange} required=""/>

                        <input type="submit" value="Post"/>
                    </form>

                </div>
                <div className="item4">
                    <CreateChatChannel userData={this.props.userData} communityData={this.props.community} />
                </div>
            </div>
        );
    }
}
export default AdminDashboard;