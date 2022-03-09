import React from "react";
import LogOut from "../Components/LogOut";
import CreateCommunity from "../Components/CreateCommunity";
import '../Assets/userDash.css';

class userDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.userData);
        console.log(this.props.userData.communities)
    }

    render() {
        return (
            <div>
                <div className="userDash">
                    <h2>User Dashboard</h2>
                    <p>{this.props.userData.username}</p>
                    <LogOut />

                    <br/>
                    <CreateCommunity />
                </div>
            </div>
        );
    }
}
export default userDashboard;