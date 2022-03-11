import React from "react";
import CommunityCreator from "../Views/CommunityCreator";

class CommunitySelect extends React.Component {
    constructor(props) {
        super(props);

        this.CreateCommunity = this.CreateCommunity.bind(this);
        this.JoinCommunity = this.JoinCommunity.bind(this);
        this.EnterCommunity = this.EnterCommunity.bind(this);
    }

    CreateCommunity(){
        return <CommunityCreator userData={this.props.userData}/>;
    }

    JoinCommunity() {

    }

    EnterCommunity(){

    }

    CommunityButtonList(userData) {
        const communities = userData.communities;
        const communityListItems = communities.map((communities) =>
            <li key = {communities.name}> <button type="button" onClick={this.EnterCommunity(communities.id)}>{communities.name}</button></li>
        );
        return(
            <ul>{communityListItems}</ul>
        );
    }

    // I had to comment some stuff out - kyle
    //                     <CommunityButtonList communities={this.props.userData.communities}/>
    render() {
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
        else
            return (
                <div>
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
    }
}


export default CommunitySelect;