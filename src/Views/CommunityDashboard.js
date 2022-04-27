import React from "react";
import axios from "axios";
import './../Assets/communityDash.css';
import Chat from "../Components/Chat";
import Calendar from "../Components/Calendar";
import Announcements from "../Components/Announcements";
import ProfileEdit from "../Components/ProfileEdit";
import AdminDashboard from "./AdminDashboard";
import { useNavigate } from "react-router-dom";
import Directory from "../Components/Directory";

class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                CommunityID: undefined,
                CommunityName: '',
                HeaderImage: undefined,
                HeaderImageHash: Date.now(),
                CommunityDescription: '',
                CommunityJoinCode: '',
            },
            isLoading: true,
            showProfileEdit: false,
            profilePhoto: undefined,
            profilePhotoHash: Date.now(),
            sideBarComp: undefined,
            eventsKey: Date.now()+"events",
            aKey: Date.now()+"announcements",
            chatKey: Date.now()+"chat"
        }

        this.openProfileEdit = this.openProfileEdit.bind(this);
        this.closeProfileEdit = this.closeProfileEdit.bind(this);
        this.openAdminDash = this.openAdminDash.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);
        this.getHeaderImage = this.getHeaderImage.bind(this);

        this.updateSideBar = this.updateSideBar.bind(this);
        this.leaveCommunity = this.leaveCommunity.bind(this);

        this.refreshComponents = this.refreshComponents.bind(this);
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        // Fetch Profile Photo
        this.getProfilePhoto();

        // Make API to get Community Data
        axios.post(('https://trivia.skybounddev.com/getCommunityData'), {
            communityID: this.props.communityID,
        }).then((response) => {
            this.setState({
                community: {
                    CommunityID: response.data[0].CommunityID,
                    CommunityName: response.data[0].CommunityName,
                    CommunityDescription: response.data[0].CommunityDescription,
                    CommunityRules: response.data[0].CommunityRules,
                    CommunityJoinCode: response.data[0].communityJoinCode,
                    HeaderImage: "/communityHeaders/" + response.data[0].CommunityID + ".png",
                    HeaderImageHash: Date.now()
                }
            }, function() {
                // Fetch Header Image
                this.getHeaderImage();

                // Update Side Bar
                this.updateSideBar();
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    //
    updateSideBar() {
        let component =
            <div id="helper">
                { this.props.isAdmin ? <a onClick={this.openAdminDash}><p>Admin Dashboard</p></a> : <p></p> }
                <a onClick={this.leaveCommunity}><p>Leave Community</p></a>
            </div>;
        this.props.updateSide(component);
    }

    // Admin Modal
    // TODO Make sure user has permissions to view admin dashboard
    openAdminDash() {
        // Get the modal
        let modal = document.getElementById("adminModal");

        modal.style.display = "block";
    }

    closeAdminDash() {
        // Get the modal
        let modal = document.getElementById("adminModal");

        modal.style.display = "none";
        console.log("BeforeRefresh");
        this.refreshComponents();
        console.log("AfterRefresh");
    }

    refreshComponents(){
        Chat.state.reloaded = true;
    }

    // Profile Modal
    openProfileEdit() {
        // Get the modal
        let modal = document.getElementById("profileModal");

        modal.style.display = "block";
    }

    closeProfileEdit() {
        // Get the modal
        let modal = document.getElementById("profileModal");

        modal.style.display = "none";
    }

    getProfilePhoto() {
        // Set path for profile photo
        let imgUrl = "https://trivia.skybounddev.com/profilePhotos/" + this.props.userData.uid + ".png";
        this.setState({
            profilePhoto: imgUrl,
            profilePhotoHash: Date.now()
        });
    }

    getHeaderImage() {
        // Set path for profile photo
        let imgUrl = "https://trivia.skybounddev.com/communityHeaders/" + this.state.community.CommunityID + ".png";
        console.log("X: " + imgUrl);
        this.setState({
            HeaderImage: imgUrl,
            HeaderImageHash: Date.now(),
            isLoading: false,
        });

        console.log("Upated Header");
    }

    leaveCommunity() {
        if (window.confirm("Are you sure you want to leave " + this.state.community.CommunityName + "?")) {
            // Make API to get Community Data
            axios.post(('https://trivia.skybounddev.com/userLeaveCommunity'), {
                communityID: this.props.communityID,
                uid: this.props.userData.uid,
            }).then((response) => {
                console.log("Trying to reload page");
                window.location.reload(false);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    // Refresh Components
    update() {
        console.log("trying to update");
        console.log("Is Admin: " + this.props.isAdmin);
        this.setState({
            eventsKey: Date.now()+"events",
            aKey: Date.now()+"announcements",
            chatKey: Date.now()+"chat"
        });

        this.getHeaderImage();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        console.log(this.state.community);

        return (
            <div className="communityDash">
                <div className="communityHeader">
                    <div className="communityNav">
                        <a onClick={this.openProfileEdit}><img className="profilePic" src={`${this.state.profilePhoto}?${this.state.profilePhotoHash}`} /></a>
                    </div>
                    <img src={`${this.state.community.HeaderImage}?${this.state.community.HeaderImageHash}`} alt="Community Header" />
                    <div className="communityInfo">
                        <h2>{this.state.community.CommunityName}</h2>
                        <p>Join Code: {this.state.community.CommunityJoinCode}</p>
                    </div>
                </div>
                <div className="communityDashContent">
                    <Calendar communityID={this.state.community.CommunityID } key={this.state.eventsKey} isAdmin={this.props.isAdmin}/>
                    <Chat userData={this.props.userData } communityData={this.state.community} isAdmin={this.props.isAdmin} key={this.state.chatKey} />
                    <Announcements communityID={this.state.community.CommunityID} key={this.state.aKey} isAdmin={this.props.isAdmin}/>
                    <Directory userData={this.props.userData} communityID = {this.state.community.CommunityID} />
                </div>
                <div id="profileModal" className="modal">
                    <div className="modal-content">
                        <a onClick={this.closeProfileEdit}><span className="close">&times;</span></a>
                        <ProfileEdit userData={this.props.userData} updateProfilePhoto={this.getProfilePhoto}/>
                    </div>
                </div>

                <div id="adminModal" className="modal">
                    <div className="admin-modal-content" >
                        <AdminDashboard userData={this.props.userData} onClose = {this.refreshComponents} community={this.state.community} update={this.update}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommunityDashboard;