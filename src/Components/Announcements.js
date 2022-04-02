import React from "react";
import axios from "axios";

class Announcements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcementTitle: undefined,
            announcementContents: undefined,
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

    deleteAnnouncement(e, announcementID){
        e.preventDefault();
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

    render() {
        return (
            <div className="announcementCreator">

            </div>
        )
    }
}
export default Announcements;