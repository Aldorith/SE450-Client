import React from "react";
import LogOut from "../Components/LogOut";


class userDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.userData);
    }

    render() {
        return (
            <div>
                <h2>User Dashboard</h2>
                <p>{this.props.userData.username}</p>
                <LogOut />
            </div>
        );
    }
}
export default userDashboard;