import React from "react";
import axios from "axios";

class Announcements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcementTitle: undefined,
            announcementDesc: undefined,
            communityID: undefined
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createAnnouncement = this.createAnnouncement.bind(this);
        this.editAnnouncement = this.editAnnouncement.bind(this);
        this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createAnnouncement (e) {
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Attempting to Create a New Announcement: " + this.state.calendarEventName);

        axios.post(('http://localhost:8900/createCalendarEvent'), {
            //** This has to be added, but first community loading need to be completed  [=]  communityID: this.props.communityData.communityID
            calendarEventName: this.state.calendarEventName,
            calendarEventDesc: this.state.calendarEventDesc,
            calendarEventTime: this.state.calendarEventTime,
            calendarEventLocation: this.state.calendarEventName,

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //above two might need to be change, not exactly sure what data[0] is, or where it is being referenced

    editAnnouncement(){

    }

    deleteAnnouncement(){

    }


    render() {
        return (
            <div className="communityCreator">
                <h2> Enter Community Information </h2>
                <form onSubmit={this.createCommunity}>
                    <label>Announcement Name: <input type="text" name="communityName" value={this.state.communityName} onChange={this.handleInputChange} /></label>
                    <label>Announcement Description: <input type="text" name="communityDesc" value={this.state.communityDesc} onChange={this.handleInputChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default Announcements;