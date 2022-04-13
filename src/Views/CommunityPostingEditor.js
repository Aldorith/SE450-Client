import React from "react";
import axios from "axios";
import '../Assets/adminDash.css';
import announcements from "../Components/Announcements";
import CreateChatChannel from "../Components/CreateChatChannel";
// Original adminDashboard.css here: https://pastebin.com/ckdnnSz1

class CommunityPostingEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            communityID: undefined,

            announcementTitle: undefined,
            announcementDesc: undefined,

            calendarEventName: undefined,
            calendarEventDesc: undefined,
            calendarEventDay: undefined,
            calendarEventLocation: 'Unknown',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editAnnouncement = this.editAnnouncement.bind(this);
        this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
        this.editCalendarEvent = this.editCalendarEvent.bind(this);
        this.deleteCalendarEvent = this.deleteCalendarEvent.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
    }

    componentDidMount() {
        this.setState({
            tempCommunityName: this.props.community.communityID
        });
    }

    // simple updater
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    editAnnouncement (e) {
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
    deleteAnnouncement(e){

    }

    editCalendarEvent(e) {
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

    deleteCalendarEvent(){

    }

    openEditor() {

    }

    closeEditor() {
        // Get the modal
        let modal = document.getElementById("editorModal");

        modal.style.display = "none";
    }


    render() {
        return (
            <div className="editorDash">
                <div className='closeButton'>
                    <a onClick={this.closeEditor}>X</a>
                </div>
            </div>
        );
    }
}
export default CommunityPostingEditor;