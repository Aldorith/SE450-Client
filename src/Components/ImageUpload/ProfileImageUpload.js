import React from "react";
import axios from "axios";

class ProfileImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: undefined,
            profilePhoto: undefined,
            profilePhotoHash: Date.now()
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getProfilePhoto();
    }

    getProfilePhoto() {
        // Set path for profile photo
        let imgUrl = "https://trivia.skybounddev.com/profilePhotos/" + this.props.userData.uid + ".png";
        this.setState({
            profilePhoto: imgUrl,
            profilePhotoHash: Date.now()
        });
    }

    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('uid', this.props.userData.uid);
        formData.append('profilePhoto',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/uploadProfilePhoto", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
                console.log("ERROR:  " + error);
        });

        // Update Profile Photo
        this.getProfilePhoto();
        this.props.updateProfilePhoto(); // Updates in CommunityDashboard.js
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div className="profile2">
                <form onSubmit={this.onFormSubmit}>
                    <p>Profile Photo Upload</p>
                    <img src={`${this.state.profilePhoto}?${this.state.profilePhotoHash}`} id="profilePhoto" alt="ProfilePhoto" />
                    <br />
                    <input type="file" name="profilePhoto" onChange= {this.onChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default ProfileImageUpload;