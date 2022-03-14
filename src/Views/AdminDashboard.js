import React from "react";
import LogOut from "../Components/LogOut";
import CreateCommunity from "../Components/CreateCommunity";
import '../Assets/adminDash.css';
import '../Assets/spacing.css';

class adminDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.userData);
        console.log(this.props.userData.communities)
    }

    render() {
        return (
            <div>
            <div className="u-container-style u-group u-radius-10 u-shape-round u-white u-group-1">
                <div className="u-container-layout u-container-layout-1">
                    <h1 className="u-align-center u-text u-text-body-color u-text-default u-text-1">Community Name</h1>
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
                                        <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form" style="padding: 10px;">
                                            <div className="u-form-group u-form-name">
                                                <label className="u-label">Community Display Name</label>
                                                <input type="text" placeholder="Community Name" id="name-54ac" name="CommDisplayName" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-form-group u-form-message">
                                                <label className="u-label">Community Description</label>
                                                <textarea placeholder="..." rows="3" cols="50" id="message-54ac" name="CommDescription" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-form-group u-form-textarea u-form-group-3">
                                                <label className="u-label">Community Rules</label>
                                                <textarea rows="3" cols="50" id="textarea-8022" name="CommRules" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required="" placeholder="1. X"/>
                                            </div>
                                            <div className="u-form-group u-form-group-4">
                                                <label className="u-label">Background</label>
                                                <input type="text" placeholder="#fffffff" id="text-d872" name="BackgroundCLR" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white"/>
                                            </div>
                                            <div className="u-form-group u-form-select u-form-group-5">
                                                <label className="u-label">Header Image</label>
                                                <div className="u-form-select-wrapper">
                                                    <select id="select-d95a" name="HeaderIMG" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white">
                                                        <option value="Image1.png">Image1.png</option>
                                                        <option value="Image2.png">Image2.png</option>
                                                        <option value="Image3.png">Image3.png</option>
                                                    </select>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" className="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"/></svg>
                                                </div>
                                            </div>
                                            <div className="u-align-right u-form-group u-form-submit">
                                                <a href="#" className="u-border-none u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">Save</a>
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
                                        <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form-1" style="padding: 10px;">
                                            <div className="u-form-group u-form-name">
                                                <label className="u-label">Post Title</label>
                                                <input type="text" placeholder="Post Title" id="name-269c" name="name" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-form-group u-form-message">
                                                <label className="u-label">Post Content</label>
                                                <textarea placeholder="..." rows="3" cols="50" id="message-269c" name="message" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-align-right u-form-group u-form-submit">
                                                <a href="#" className="u-border-none u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-2">Post</a>
                                                <input type="submit" value="post" className="u-form-control-hidden"/>
                                            </div>
                                            <div className="u-form-send-message u-form-send-success"> Post has been sent. </div>
                                            <div className="u-form-send-error u-form-send-message"> Unable to send. Cannot connect to server. </div>
                                            <input type="hidden" value="" name="recaptchaResponse"/>
                                        </form>
                                    </div>
                                    <h2 className="u-text u-text-2">Create An Event</h2>
                                    <div className="u-expanded-width u-form u-form-3">
                                        <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form-2" style="padding: 10px;">


                                            <div className="u-form-group u-form-name u-form-partition-factor-2">
                                                <label className="u-label">Event Title</label>
                                                <input type="text" placeholder="Event Title" id="name-8220" name="name" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-form-email u-form-group u-form-partition-factor-2">
                                                <label className="u-label">Date &amp; Time</label>
                                                <input type="email" placeholder="1/1/2022 - 5 PM" id="email-8220" name="email" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-form-group u-form-message">
                                                <label className="u-label">Event Description</label>
                                                <textarea placeholder="..." rows="3" cols="50" id="message-8220" name="message" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required=""/>
                                            </div>
                                            <div className="u-align-right u-form-group u-form-submit">
                                                <a href="#" className="u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-3">Post</a>
                                                <input type="submit" value="post" className="u-form-control-hidden"/>
                                            </div>
                                            <div className="u-form-send-message u-form-send-success"> Your event has been posted. </div>
                                            <div className="u-form-send-error u-form-send-message"> Unable to post event. Cannot connect to server. </div>
                                            <input type="hidden" value="" name="recaptchaResponse"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="u-text u-text-default u-text-3">Community Settings<br/>
                </h2>
            </div>
        </section></div>
        );
    }
}
export default adminDashboard;