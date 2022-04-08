import React from "react";
import axios from "axios";
import './../Assets/Announcements.css';

class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.announcementListRef = React.createRef();
        this.state = {
            announcementTitle: undefined,
            announcementContents: undefined,
            isLoading: true,
            announcementEvents: [],
            selectChoice: "",
            editState: "",
            deleteState: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createAnnouncement = this.createAnnouncement.bind(this);
        this.editAnnouncement = this.editAnnouncement.bind(this);
        this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    }

    async componentDidMount() {
        console.log("Retrieving Announcement Data for Community: " + this.props.communityID);
        axios.post(('/loadAnnouncement'), {
            communityID: this.props.communityID,
        }).then((response) => {
            //This is where the response is handled from the server
            console.log(response.data[0]);
            this.setState({announcementEvents: response.data, isLoading: false})
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

    createAnnouncement (e) {
        e.preventDefault(); // This prevents the page from refreshing
        console.log("Attempting to Create a New Announcement: " + this.state.announcementTitle);

        axios.post(('/createAnnouncement'), {
            communityID: this.props.communityID,
            announcementTitle: this.state.announcementTitle,
            announcementContents: this.state.announcementContents

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //above two might need to be change, not exactly sure what data[0] is, or where it is being referenced

    editAnnouncement(e, announcementID){
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Editing a Announcement: " + announcementID);

        axios.post(('/editAnnouncement'), {
            announcementID: announcementID,
            communityID: this.props.communityID,
            announcementTitle: this.state.announcementTitle,
            announcementContents: this.state.announcementContents

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteAnnouncement(announcementID){
        console.log("Deleting Announcement: " + announcementID);

        axios.post(('/deleteAnnouncement'), {
            announcementID: announcementID

        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    openAnnouncementEditor(){
    }

    handleOption(announcementID, announcementTitle, announcementDescription){
        console.log("Gettin some callin");
        if(this.state.selectChoice === "delete")
            this.deleteAnnouncement(announcementID);
        if(this.state.selectChoice === "edit")
            this.openAnnouncementEditor(announcementID, announcementTitle, announcementDescription)

    }

    render() {
        if(this.state.isLoading)
            return(
                <div>
                    Loading Announcements
                </div>
            )

        return(
            <div className = "communityAnnouncements">
                <p className = "announcementsTitle">Community Announcements</p>
                <div className= "announcementsBox">
                    <div className = "announcements">
                        <ul className = "announcementsList" ref = {this.announcementListRef}>
                            {this.state.announcementEvents.map(announcementEvents =>
                                (<li className = "announcementsListItem" key={announcementEvents.AnnouncementID.toString()}>
                                        <div>
                                            <p className = "announcement">
                                                <span className = "announcementTitle">{announcementEvents.AnnouncementTitle} </span>
                                                <span className = "announcementDescription">{announcementEvents.AnnouncementText} </span>
                                                <select className = "optionSelect" onSelect={this.handleOption(announcementEvents.AnnouncementID, announcementEvents.AnnouncementTitle, announcementEvents.AnnouncementDescription)}>
                                                    <option hidden defaultValue={""}></option>
                                                    <option name = {"selectChoice"} value = {"edit"} onChange={this.handleInputChange}>Edit</option>
                                                    <option name = {"selectChoice"} value = {"delete"} onChange={this.handleInputChange}>Delete</option>
                                                </select>
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
export default Announcements;