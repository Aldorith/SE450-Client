import React from "react";
import './../Assets/profile.css';
import ProfileImageUpload from "./ImageUpload/ProfileImageUpload";

class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="profile">
                <h2>{this.props.userData.username}</h2>
                <ProfileImageUpload userData={this.props.userData} updateProfilePhoto={this.props.updateProfilePhoto} />
            </div>
        )
    }
}

export default ProfileEdit;