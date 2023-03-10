import React, {useState} from "react";
import axios from "axios";

class CommunityPostingEditor extends React.Component {
    constructor(props) {
        super(props);

        this.announcementListRef = React.createRef();
        this.calendarListRef = React.createRef();
        this.state = {
            communityID: undefined,

            announcementEvents: [],
            calendarEvents: [],

            announcementTitle: undefined,
            announcementDesc: undefined,

            calendarEventName: undefined,
            calendarEventDesc: undefined,
            calendarEventDay: undefined,
            calendarEventLocation: undefined,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            communityID: this.props.communityID
        });

        console.log("Retrieving Calendar Data for Community: " + this.props.communityID);
        axios.post(('https://trivia.skybounddev.com/loadCalendar'), {
            communityID: + this.props.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({calendarEvents: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });

        console.log("Retrieving Announcement Data for Community: " + this.props.communityID);
        axios.post(('https://trivia.skybounddev.com/loadAnnouncement'), {
            communityID: this.props.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({announcementEvents: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteAnnouncement(e, announcementID){
        e.preventDefault();
        console.log("Deleting Announcement: " + announcementID);

        axios.post(('https://trivia.skybounddev.com/deleteAnnouncement'), {
            announcementID: announcementID

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    deleteCalendarEvent(eventID){
        console.log("Deleting a Calendar Event: " + eventID);

        axios.post(('https://trivia.skybounddev.com/deleteCalendarEvent'), {
            eventID: eventID

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    // simple updater
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="editorDash">
                <div className = "editorTitle"> Community Post Manager </div>
                <div className = "announcementEditor">
                    <h2> Announcement Delete </h2>
                    <div className = "announcementBox">
                        <ul className = "announcementsList" ref = {this.announcementListRef}>
                            {this.state.announcementEvents.map(announcementEvents =>
                                (<li className = "announcementsListItem" key={announcementEvents.AnnouncementID.toString()}>
                                        <a onClick={(e) => {this.deleteAnnouncement(e, announcementEvents.AnnouncementID)}}>
                                            <p className = "announcement">
                                                <span className = "announcementTitle">{announcementEvents.AnnouncementTitle} </span>
                                                <span className = "announcementDescription">{announcementEvents.AnnouncementText} </span>
                                                <span> {announcementEvents.AnnouncementID}</span>
                                            </p>
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className = "calendarEditor">
                    <h2> Calendar Event Delete</h2>
                    <div className = "calendarBox">
                        <ul className = "calendarEventList" ref = {this.calendarListRef}>
                            {this.state.calendarEvents.map(calendarEvents =>
                                (<li className = "calendarListItem" key={calendarEvents.EventID.toString()}>
                                        <a onClick={(e) => {this.deleteCalendarEvent(e, calendarEvents.EventID)}}>
                                            <p className = "event">
                                                <span className = "eventTitle">{calendarEvents.EventTitle}   </span>
                                                <span className = "eventDateTime">{calendarEvents.EventDateTime}   </span>
                                                <span className = "eventLocation">{calendarEvents.EventLocation}</span><br/>
                                                <span className = "eventDescription">{calendarEvents.EventDescription}</span>
                                            </p>
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default CommunityPostingEditor;