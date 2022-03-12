import React from "react";
import CommunityCreator from "../Views/CommunityCreator";

class CommunitySelect extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.CreateCommunity = this.CreateCommunity.bind(this);
/*        this.JoinCommunity = this.JoinCommunity.bind(this);
        this.EnterCommunity = this.EnterCommunity.bind(this);*/
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        //Enter Code appropriate to initiating the joining of the community here
        event.preventDefault();
    }

    CreateCommunity(){
        return <CommunityCreator userData={this.props.userData}/>;
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
                    <ul style = "list-style: none;">
                        <li>
                            <h2>Join a Community</h2>
                        </li>
                        <li>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Enter Community Join Code:
                                    <input type = "text" value = {this.state.value} onChange = {this.handleChange}/>
                                </label>
                                <input type = "submit" value="Submit" />
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