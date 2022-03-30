import React from "react";
import './../Assets/profile.css';

class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="profile">
                <h2>{this.props.userData.username}</h2>
                <p>Profile Edit Options</p>
            </div>
        )
    }
}

export default ProfileEdit;