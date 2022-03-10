import React from "react";
import '../Assets/leftNav.css';

import testCommunityLogo from '../Assets/images/testCommunityLogo.png';

class VertNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    loadCommunity (communityID) {
        console.log(communityID);
    }

    render() {
        const communityIds = [1, 2, 3];

        // Replace with Actual System Later
        let images = [];
        images[1] = testCommunityLogo;
        images[2] = testCommunityLogo;
        images[3] = testCommunityLogo;

        return (
            <div className="vertNavBar">
                <h2>Logo</h2>
                <ul>
                    {communityIds.map((cID) =>
                        <li key={cID.toString()}>
                            <a onClick={() => this.loadCommunity(cID)}>
                                <img src={images[cID]}/>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default VertNavBar;