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

        axios.post(('http://localhost:8900/createAnnouncement'), {
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

    editAnnouncement(){

    }

    deleteAnnouncement(){

    }


    render() {
        return (
            <div className="announcementCreator">
                <h2> Enter Announcement Information </h2>
                <form onSubmit={this.createAnnouncement}>
                    <label> Announcement Title: <input type="text" name="announcementTitle" value={this.state.announcementTitle} onChange={this.handleInputChange} /></label>
                    <label> Announcement Contents: <input type="text" name="announcementContents" value={this.state.announcementContents} onChange={this.handleInputChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default Announcements;