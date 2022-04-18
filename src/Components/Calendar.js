import React from "react";
import axios from "axios";
import './../Assets/Calendar.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.calendarListRef = React.createRef();
        this.state = {
            isLoading: true,
            calendarEvents: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.editCalendarEvent = this.editCalendarEvent.bind(this);
        this.deleteCalendarEvent = this.deleteCalendarEvent.bind(this);
    }

    async componentDidMount() {
        console.log("Retrieving Calendar Data for Community: " + this.props.communityID);
        axios.post(('/loadCalendar'), {
            communityID: + this.props.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({calendarEvents: response.data, isLoading: false})
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    editCalendarEvent(e, eventID){
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Editing a Calendar Event: " + eventID);

        axios.post(('/editCalendarEvent'), {
            eventID: eventID,
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

    deleteCalendarEvent(e, eventID){
        e.preventDefault();
        console.log("Deleting a Calendar Event: " + eventID);

        axios.post(('/deleteCalendarEvent'), {
            eventID: eventID

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if(this.state.isLoading)
            return(
                <div>
                    Loading Calendar
                </div>
            )
        if(this.state.calendarEvents.length == 0)
            return(
                <div className = "communityCalendar">
                    <p className = "calendarTitle">Events Coming Up</p>
                    <div className= "calendarBox">
                        <div className = "calendarEmpty">
                           No Upcoming Events
                        </div>
                    </div>
                </div>
            )

        return(
            <div className = "communityCalendar">
                <p className = "calendarTitle">Events Coming Up</p>
                <div className= "calendarBox">
                    <div className = "calendarEvents">
                        <ul className = "calendarEventList" ref = {this.calendarListRef}>
                            {this.state.calendarEvents.map(calendarEvents =>
                             (<li className = "calendarListItem" key={calendarEvents.EventID.toString()}>
                                     <div>
                                         <p className = "event">
                                             <span className = "eventTitle">{calendarEvents.EventTitle}   </span>
                                             <span className = "eventDateTime">{calendarEvents.EventDateTime}   </span>
                                             <span className = "eventLocation">{calendarEvents.EventLocation}</span><br/>
                                             <span className = "eventDescription">{calendarEvents.EventDescription}</span>
                                         </p>
                                     </div>
                             </li>
                             ))}
                        </ul>
                    </div>
                </div>
            </div>
        )


    }
}
export default Calendar;