import React from "react";
import CommunityCreator from "../Views/CommunityCreator";
import UserDashboard from "../Views/UserDashboard";
import axios from "axios";

class CommunitySelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communityJoinCode: '',
            errorMessage: '',
        }

        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.joinCommunity = this.joinCommunity.bind(this);
        this.CreateCommunity = this.CreateCommunity.bind(this);
    }

    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.joinCommunity = this.joinCommunity.bind(this);
        this.CreateCommunity = this.CreateCommunity.bind(this);
    }

    joinCommunity(event){
        let that = this;
        //Have User Join Community
        // Make API call to web server
        axios.post(('/userJoinCommunity'), {
            uid: this.props.userData.uid,
            communityJoinCode: this.state.communityJoinCode,
        }).then((response) => {
            console.log(response.data);
            if(response.data.length >= 1) {
                that.setErrorMessage('');
                this.props.switchCommunity(response.data[0].CommunityID);
            }
            else
            {
                that.setErrorMessage('Invalid Join Code: Try again!');
            }
        })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    }

    CreateCommunity(){
        this.props.loadCreateCommunity();
    }

    render() {
        return (
            <div>
                <h1>Looks like you aren't a part of any communities yet!</h1>
                <h2>Let's Fix that!</h2>
                <ul>
                    <li>
                        <h2>Join a Community</h2>
                    </li>
                    <li>
                        <form onSubmit={this.joinCommunity}>
                            <label>
                                Enter Community Join Code:
                                <input type="text" value={this.state.communityJoinCode} name="communityJoinCode" onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Submit" />
                            {this.state.errorMessage && (
                                <p className="error"> {this.state.errorMessage}</p>
                            )}
                        </form>
                    </li>
                    <li>
                        <h2>Create a Community</h2>
                    </li>
                    <li>
                        <button type="button" onClick={this.CreateCommunity}> Create Community</button>
                    </li>
                </ul>
            </div>
        )
    }
}


export default CommunitySelect;