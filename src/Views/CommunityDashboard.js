import React from "react";
import axios from "axios";
import './../Assets/communityDash.css';
import Chat from "../Components/Chat";
import Calendar from "../Components/Calendar";
import Announcements from "../Components/Announcements";
import ProfileEdit from "../Components/ProfileEdit";
import AdminDashboard from "./AdminDashboard";
import Directory from "../Components/Directory";

class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                CommunityID: undefined,
                CommunityName: undefined,
                HeaderImage: undefined,
                HeaderImageHash: Date.now(),
                CommunityDescription: undefined,
                CommunityJoinCode: undefined,
            },
            isLoading: true,
            showProfileEdit: false,
            profilePhoto: undefined,
            profilePhotoHash: Date.now()
        }

        this.openProfileEdit = this.openProfileEdit.bind(this);
        this.closeProfileEdit = this.closeProfileEdit.bind(this);
        this.openAdminDash = this.openAdminDash.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);
        this.getHeaderImage = this.getHeaderImage.bind(this);
    }

    async componentDidMount() {
        // Fetch Profile Photo
        this.getProfilePhoto();

        // Make API to get Community Data
        axios.post(('/getCommunityData'), {
            communityID: this.props.communityID,
        }).then((response) => {
            this.setState({
                community: {
                    CommunityID: response.data[0].CommunityID,
                    CommunityName: response.data[0].CommunityName,
                    CommunityDescription: response.data[0].CommunityDescription,
                    CommunityRules: response.data[0].CommunityRules,
                    HeaderImage: "/communityHeaders/" + response.data[0].CommunityID + ".png",
                    HeaderImageHash: Date.now()
                }
            }, function() {
                // Fetch Header Image
                this.getHeaderImage();
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
        let imgUrl = "/profilePhotos/" + this.props.userData.uid + ".png";
        this.setState({
            profilePhoto: imgUrl,
            profilePhotoHash: Date.now()
        });
    }

    getHeaderImage() {
        // Set path for profile photo
        let imgUrl = "/communityHeaders/" + this.state.community.CommunityID + ".png";
        console.log("X: " + imgUrl);
        this.setState({
            HeaderImage: imgUrl,
            HeaderImageHash: Date.now(),
            isLoading: false,
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="communityDash">
                <div className="communityHeader">
                    <div className="communityNav">
                        <a onClick={this.openAdminDash}><p>Admin Dashboard</p></a>
                        <a onClick={this.openProfileEdit}><img className="profilePic" src={`${this.state.profilePhoto}?${this.state.profilePhotoHash}`} /></a>
                    </div>
                    <img src={`${this.state.community.HeaderImage}?${this.state.community.HeaderImageHash}`} alt="Community Header" />
                    <div className="communityInfo">
                        <h2>{this.state.community.CommunityName}</h2>
                        <p>X Members</p>
                    </div>
                </div>
                <div className="communityDashContent">
                    <Calendar communityID={this.state.community.CommunityID } />
                    <Chat userData={this.props.userData } communityData={this.state.community} />
                    <Announcements communityID={this.state.community.CommunityID } />
                </div>

                <div id="profileModal" className="modal">
                    <div className="modal-content">
                        <a onClick={this.closeProfileEdit}><span className="close">&times;</span></a>
                        <ProfileEdit userData={this.props.userData} updateProfilePhoto={this.getProfilePhoto}/>
                    </div>
                </div>

                <div id="adminModal" className="modal">
                    <div className="admin-modal-content" >
                        <AdminDashboard userData={this.props.userData} community={this.state.community} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CommunityDashboard;