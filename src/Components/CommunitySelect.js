import React from "react";
import CommunityCreator from "../Views/CommunityCreator";
import UserDashboard from "../Views/UserDashboard";
import axios from "axios";

class CommunitySelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communityJoinCode: '',
            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.CreateCommunity = this.CreateCommunity.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        //Have User Join Community
        // Make API call to web server
        axios.post(('http://localhost:8900/userJoinCommunity'), {
            uid: this.props.userData.uid,
            communityJoinCode: this.state.communityJoinCode,
        }).then(function (response) {
            console.log(response.data);
            if(response.data.length > 1) {
                this.state.errorMessage = '';
                this.props.loadCommunity(response.data[0].communityID);
            }
            else
            {
                this.state.errorMessage = "Invalid Join Code: Try again!";
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
/*
    CommunityButtonList(userData) {
        const communities = userData.communities;
        const communityListItems = communities.map((communities) =>
            <li key = {communities.name}> <button type="button" onClick={this.EnterCommunity(communities.id)}>{communities.name}</button></li>
        );
        return(
            <ul>{communityListItems}</ul>
        );
    }
*/
    // I had to comment some stuff out - kyle
    //                     <CommunityButtonList communities={this.props.userData.communities}/>
    render() {/*
        if (this.props.userData.communities.length)
            return (
                <div>
                    <h1>Current Communities</h1><br/>
                    <br/>
                    <ul>
                        <li>
                            <button type="button" onClick={this.JoinCommunity}> Join a Community</button>
                        </li>
                        <li>
                            <button type="button" onClick={this.CreateCommunity}> Create a Community</button>
                        </li>
                    </ul>
                </div>
            )
        else*/
            return (
                <div>
                    <h1>Looks like you aren't a part of any communities yet!</h1>
                    <h2>Let's Fix that!</h2>
                    <ul>
                        <li>
                            <h2>Join a Community</h2>
                        </li>
                        <li>
                            <form onSubmit={this.handleSubmit}>
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