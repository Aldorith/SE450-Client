import React from "react";
import axios from "axios";
import '../Assets/style.css';
import '../Assets/adminDash.css';
import announcements from "../Components/Announcements";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                CommunityID: undefined,
                CommunityName: undefined,
                LogoID: undefined,
                HeaderID: undefined,
                CommunityDescription: undefined,
                CommunityJoinCode: undefined,
                PrimaryColor: undefined,
                SecondaryColor: undefined,
            },

            CommunityName: undefined,
            LogoID: undefined,
            HeaderID: undefined,
            CommunityDescription: undefined,
            CommunityJoinCode: undefined,
            PrimaryColor: undefined,
            SecondaryColor: undefined,

            announcementTitle: undefined,
            announcementDesc: undefined,

            calendarEventName: undefined,
            calendarEventDesc: undefined,
            calendarEventDay: undefined,
            calendarEventLocation: 'Unknown',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.postEvent = this.postEvent.bind(this);
    }

    componentDidMount() {
        // Make API to get Community Data
        axios.post(('/getCommunityData'), {
            communityID: this.props.userData.communities[0].CommunityID,
        }).then((response) => {
            this.setState({community: response.data[0]}, function() {
                this.setState({isLoading: false})
            });

            this.setState({communityName: this.state.community.communityName})
            this.setState({communityDescription: this.state.community.communityDescription})

        }).catch(function (error) {
            console.log(error);
        });
    }

    // simple updater
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    // this does nothing right now
    updateRules(e) {
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Attempting to Update Community: " + this.state.community.communityName);


    }

    sendPost(e) {
        e.preventDefault(); // This prevents the page from refreshing

        axios.post(('/createAnnouncement'), {
            communityID: this.props.userData.communities[0].CommunityID,
            announcementTitle: this.state.announcementTitle,
            announcementContents: this.state.announcementDesc
        }).then(function (response) {
            console.log(response.data[0]);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    postEvent(e) {
        e.preventDefault(); // This prevents the page from refreshing


        axios.post(('/createCalendarEvent'), {
            communityID: this.props.userData.communities[0].CommunityID,
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

    render() {
        return (
            <div>
                <div className="u-container-style u-group u-radius-10 u-shape-round u-white u-group-1">
                    <div className="u-container-layout u-container-layout-1">
                        <h1 className="u-align-center u-text u-text-body-color u-text-2">{this.state.community.CommunityName}</h1>
                        <h2 className="u-align-center u-text u-text-body-color u-text-2">Admin Dashboard</h2>
                    </div>
                </div>
                <section className="u-clearfix u-palette-1-dark-2 u-section-1" id="sec-bdf9">
                    <div className="u-clearfix u-sheet u-sheet-1">
                        <h2 className="u-text u-text-default u-text-1">Post An Announcement</h2>
                        <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                            <div className="u-layout">
                                <div className="u-layout-row">
                                    <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                                        <div className="u-container-layout u-container-layout-1">
                                            <div className="u-form u-form-1">
                                                <form onSubmit={this.updateRules} className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form" style={{padding: '10px'}}>
                                                    <div className="u-form-group u-form-name">
                                                        <label className="u-label">Community Display Name</label>
                                                        <input value={this.state.community.communityName} type="text" placeholder="Community Name" id="name-54ac" name="CommDisplayName" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-form-group u-form-message">
                                                        <label className="u-label">Community Description</label>
                                                        <textarea value={this.state.communityDescription} placeholder="..." rows="3" cols="50" id="message-54ac" name="CommDescription" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-form-group u-form-textarea u-form-group-3">
                                                        <label className="u-label">Community Rules</label>
                                                        <textarea value={this.state.communityRules} rows="3" cols="50" id="textarea-8022" name="CommRules" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required="" placeholder="1. X"/>
                                                    </div>
                                                    <div className="u-form-group u-form-group-4">
                                                        <label className="u-label">Background</label>
                                                        <input value={this.state.primaryColor} type="text" placeholder="#fffffff" id="text-d872" name="BackgroundCLR" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange}/>
                                                    </div>
                                                    <div className="u-form-group u-form-select u-form-group-5">
                                                        <label className="u-label">Header Image</label>
                                                        <div className="u-form-select-wrapper">
                                                            <input type ="file" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange}></input>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" className="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"/></svg>
                                                        </div>
                                                    </div>
                                                    <div className="u-align-right u-form-group u-form-submit">
                                                        <a className="u-border-none u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">Save</a>
                                                        <input type="submit" value="save" className="u-form-control-hidden"/>
                                                    </div>
                                                    <div className="u-form-send-message u-form-send-success"> Changes have been saved. </div>
                                                    <div className="u-form-send-error u-form-send-message"> Unable to save changes. Cannot connect to server. </div>
                                                    <input type="hidden" value="" name="recaptchaResponse"/>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                                        <div className="u-container-layout u-container-layout-2">
                                            <div className="u-expanded-width u-form u-form-2">
                                                <form id = "announcementForm" onSubmit={this.sendPost} className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form-1" style={{padding: '10px'}}>
                                                    <div className="u-form-group u-form-name">
                                                        <label className="u-label">Post Title</label>
                                                        <input value={this.state.announcementTitle} type="text" placeholder="Post Title" id="name-269c" name="announcementTitle" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-form-group u-form-message">
                                                        <label className="u-label">Post Content</label>
                                                        <textarea value={this.state.announcementDesc} placeholder="..." rows="3" cols="50" id="message-269c" name="announcementDesc" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-align-right u-form-group u-form-submit">
                                                        <button type="submit" form={"announcementForm"} className="u-border-none u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-2">Post</button>
                                                    </div>
                                                </form>

                                            </div>
                                            <h2 className="u-text u-text-2">Create An Event</h2>
                                            <div className="u-expanded-width u-form u-form-3">
                                                <form id = "eventForm" onSubmit={this.postEvent} className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form-2" style={{padding: '10px'}}>
                                                    <div className="u-form-group u-form-name u-form-partition-factor-2">
                                                        <label className="u-label">Event Title</label>
                                                        <input value={this.state.calendarEventName} type="text" placeholder="Event Title" id="name-8220" name="calendarEventName" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-form-email u-form-group u-form-partition-factor-2">
                                                        <label className="u-label">Date &amp; Time</label>
                                                        <input value={this.state.calendarEventDay} type="date" placeholder="1/1/2022 - 5 PM" id="date-8220" name="calendarEventDay" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-form-group u-form-message">
                                                        <label className="u-label">Event Description</label>
                                                        <textarea value={this.state.calendarEventDesc} placeholder="..." rows="3" cols="50" id="message-8220" name="calendarEventDesc" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" onChange={this.handleInputChange} required=""/>
                                                    </div>
                                                    <div className="u-align-right u-form-group u-form-submit">
                                                        <button type="submit" form={"eventForm"} className="u-border-none u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-2">Post</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="u-text u-text-default u-text-3">Community Settings<br/></h2>
                    </div>
                </section>
            </div>
        );
    }
}
export default AdminDashboard;