import React from "react";
import axios from "axios";

import CommunityCreator from "../Views/CommunityCreator";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarEventName: undefined,
            calendarEventDay: undefined,
            calendarEventDesc: undefined,
            calendarEventLocation: undefined,
            calendarCommunityID: undefined
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createCalendarEvent = this.createCalendarEvent().bind(this);
        this.editCalendarEvent = this.editCalendarEvent().bind(this);
        this.deleteCalendarEvent = this.deleteCalendarEvent().bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createCalendarEvent (e) {
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Attempting to Create a New Calendar Event: " + this.state.calendarEventName);

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

    editCalendarEvent(){

    }

    deleteCalendarEvent(){

    }

    render() {
        return (
            <div className="communityCreator">
                <h2> Enter Community Information </h2>
                <form onSubmit={this.createCommunity}>
                    <label> Community Name: <input type="text" name="communityName" value={this.state.communityName} onChange={this.handleInputChange} /></label>
                    <label> Community Description: <input type="text" name="communityDesc" value={this.state.communityDesc} onChange={this.handleInputChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default Calendar;