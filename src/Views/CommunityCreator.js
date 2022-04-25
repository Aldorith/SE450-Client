import React from "react";
import axios from "axios";

class CommunityCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communityName: undefined,
            communityDesc: undefined
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createCommunity = this.createCommunity.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createCommunity (e) {
        e.preventDefault(); // This prevents the page from refreshing

        console.log("Attempting to Create Community: " + this.state.communityName);

        axios.post(('/createCommunity'), {
            uid: this.props.userData.uid,
            communityName: this.state.communityName,
            communityDesc: this.state.communityDesc
        }).then(function (response) {
            console.log(response.data[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="communityCreator">
               <h2>Create Community</h2>
                <form onSubmit={this.createCommunity}>
                    <label>Community Name <br /> <input type="text" name="communityName" value={this.state.communityName} onChange={this.handleInputChange} /></label>
                    <br />
                    <br />
                    <label>Community Description<br /> <input type="text" name="communityDesc" value={this.state.communityDesc} onChange={this.handleInputChange} /></label>
                    <br />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default CommunityCreator;