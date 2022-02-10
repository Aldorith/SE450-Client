import React from "react";


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
            </div>
        );
    }
}
export default userDashboard;