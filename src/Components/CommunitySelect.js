import React from "react";
import CommunityCreator from "../Views/CommunityCreator";

class CommunitySelect extends React.Component {
    constructor(props) {
        super(props);

        this.CreateCommunity = this.CreateCommunity.bind(this);
    }

    CreateCommunity(){
        return <CommunityCreator userData={this.props.userData}/>;
    }

    render() {
        if (this.props.userData.communities.length)
            return (
                <div>
                    <h1>Current Communities</h1><br/>
                    <CommunityButtonList communities={this.props.userData.communities}/>
                    <br/>
                    <ul>
                        <li>
                            <button type="button" onClick="joinCommunity()"> Join a Community</button>
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
                            <button type="button" onClick="JoinCommunity()"> Join a Community</button>
                        </li>
                        <li>
                            <button type="button" onClick="CreateCommunity()"> Create a Community</button>
                        </li>
                    </ul>
                </div>
            )
    }
}

function CommunityButtonList(userData) {
    const communities = userData.communities;
    const communityListItems = communities.map((communities) =>
        <li key = {communities.name}> <button type="button" onClick={EnterCommunity(communities.id)}>{communities.name}</button></li>
    );
    return(
        <ul>{communityListItems}</ul>
    );
}

function JoinCommunity() {

}
function EnterCommunity(){

}

export default CommunitySelect;