import React from "react";
import axios from "axios";

class ProfileImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
        axios.post("http://localhost:8900/uploadProfilePhoto", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
                console.log("ERROR:  " + error);
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div>
                <p>Image Upload:</p>
                <form onSubmit={this.onFormSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" name="profilePhoto" onChange= {this.onChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default ProfileImageUpload;