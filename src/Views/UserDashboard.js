import React from "react";
import LogOut from "../Components/LogOut";
import '../Assets/userDash.css';
import CommunityCreator from "./CommunityCreator";
import VertNavBar from "../Components/VertNavBar";

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

    UserDash (props) {
        return (
            <div>
                <h2>User Dashboard</h2>
                <p>{this.props.userData.username}</p>
                <LogOut />

                <br/>
                <button onClick={this.loadCommunityCreator}>Create Community</button>
            </div>
        )
    }

    render() {
        let componentToRender;

        if (this.state.showCommunityCreator) {
            componentToRender = <CommunityCreator userData={this.props.userData} />;
        } else {
            componentToRender = this.UserDash();
        }

        return (
            <div className="rootUserDashDiv">
                <VertNavBar userData={this.props.userData} />
                <div className="userDash">
                    {componentToRender}
                </div>
            </div>
        );
    }
}
export default userDashboard;