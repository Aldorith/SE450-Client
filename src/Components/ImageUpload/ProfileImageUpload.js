import React from "react";
import axios from "axios";

class ProfileImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: undefined,
            profilePhoto: undefined
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getProfilePhoto();
    }

    getProfilePhoto() {
        // Set path for profile photo
        let imgUrl = "/profilePhotos/" + this.props.userData.uid + ".png";
        this.setState({
            profilePhoto: imgUrl
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

        // TODO Properly implement image update
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div>
                <p>Image Upload:</p>
                <form onSubmit={this.onFormSubmit}>
                    <h1>Profile Photo Upload</h1>
                    <img src={this.state.profilePhoto} className="profilePhoto" alt="ProfilePhoto" />
                    <br />
                    <input type="file" name="profilePhoto" onChange= {this.onChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default ProfileImageUpload;