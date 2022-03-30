import React from "react";
import '../Assets/leftNav.css';

import testCommunityLogo from '../Assets/images/testCommunityLogo.png';

class VertNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communityIDs: []
        }
    }

    componentDidMount() {
        let communityIDs = [];

        this.props.userData.communities.forEach(community =>
        {
            communityIDs.push(community.CommunityID);
        });

        this.setState({
            communityIDs: communityIDs
        })
    }

    loadCommunity (communityID) {
        console.log(communityID);
    }

    render() {

        return (
            <div className="vertNavBar">
                <h2>Logo</h2>
                <ul>
                    {this.props.userData.communities.map((community) =>
                        <li key={community.CommunityID.toString()}>
                            <a onClick={() => this.props.switchCommunity(community.CommunityID)}>
                                <img />
                            </a>
                        </li>
                    )}
                </ul>

            </div>
        )
    }
}

export default VertNavBar;