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
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createCalendarEvent = this.createCalendarEvent.bind(this);
        this.editCalendarEvent = this.editCalendarEvent.bind(this);
        this.deleteCalendarEvent = this.deleteCalendarEvent.bind(this);
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
        e.preventDefault();
        console.log("Attempting to Create a New Calendar Event: " + this.state.calendarEventName);

        axios.post(('http://localhost:8900/createCalendarEvent'), {
            communityID: this.props.communityID,
            calendarEventName: this.state.calendarEventName,
            calendarEventDesc: this.state.calendarEventDesc,
            calendarEventDay: this.state.calendarEventDay,
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
            <div className="calendarEventCreator">
                <h2> Enter Event Information </h2>
                <form onSubmit={this.createCalendarEvent}>
                    <label> Calendar Event Name: <input type="text" name="calendarEventName" value={this.state.calendarEventName} onChange={this.handleInputChange} /></label>
                    <label> Calendar Event Description: <input type="text" name="calendarEventDesc" value={this.state.calendarEventDesc} onChange={this.handleInputChange} /></label>
                    <label> Calendar Event Location: <input type="text" name="calendarEventLocation" value={this.state.calendarEventLocation} onChange={this.handleInputChange} /></label>
                    <label> Calendar Event Day: <input type="text" name="calendarEventDay" value={this.state.calendarEventDay} onChange={this.handleInputChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default Calendar;