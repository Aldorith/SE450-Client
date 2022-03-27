import React from "react";
import axios from "axios";

import manageCalendar from "./Calendar";

class ShowCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.createCalendarEvent = this.createCalendarEvent().bind(this);
        }

        createCalendarEvent(){
            return <manageCalendar communityID={this.communityID } />;
        }
}
//thinking maybe we one time just want to show the calander. Not currently used. Same for showAnnouncements()
export default ShowCalendar;