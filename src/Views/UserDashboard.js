import React from "react";
import LogOut from "../Components/LogOut";
import '../Assets/userDash.css';
import CommunityCreator from "./CommunityCreator";

class userDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommunityCreator: false
        }

        this.loadCommunityCreator = this.loadCommunityCreator.bind(this);
    }

    componentDidMount() {
        console.log(this.props.userData);
        console.log(this.props.userData.communities)
    }

    loadCommunityCreator() {
        this.setState({showCommunityCreator: true});
    }

    render() {
        return (
            <div>
                <div className="userDash">
                    <h2>User Dashboard</h2>
                    <p>{this.props.userData.username}</p>
                    <LogOut />

                    <br/>
                    <button onClick={this.loadCommunityCreator}>Create Community</button>

                    {this.state.showCommunityCreator &&
                        <CommunityCreator userData={this.props.userData} />
                    }
                </div>
            </div>
        );
    }
}
export default userDashboard;