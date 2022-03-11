import React from "react";
import LogOut from "../Components/LogOut";
import '../Assets/userDash.css';
import CommunityCreator from "./CommunityCreator";
import VertNavBar from "../Components/VertNavBar";
import Calendar from "../Components/Calendar";
import ProfileImageUpload from "../Components/ImageUpload/ProfileImageUpload";
import Chat from "../Components/Chat";

class userDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommunityCreator: false,
            showCalendar: false,
            showEventCreator: false,
            showTestImageUpload: false
        }

        this.loadCommunityCreator = this.loadCommunityCreator.bind(this);
        this.loadCalendar = this.loadCalendar.bind(this);
        this.loadEventCreator= this.loadEventCreator.bind(this);
        this.showTestImageUpload = this.showTestImageUpload.bind(this);
    }

    componentDidMount() {
        console.log(this.props.userData);
        console.log(this.props.userData.communities)
    }

    loadCommunityCreator() {
        this.setState({showCommunityCreator: true});
    }

    loadCalendar() {
        this.setState({showCalendar: true});
    }

    loadEventCreator() {
        this.setState({showEventCreator: true});
    }

    showTestImageUpload() {
        this.setState({showTestImageUpload: true});
    }

    UserDash (props) {
        return (
            <div>
                <h2>User Dashboard</h2>
                <p>{this.props.userData.username}</p>
                <LogOut />

                <br/> <br/>
                <button onClick={this.loadCommunityCreator}>Create Community</button>
                <br/> <br/>
                <button onClick={this.showTestImageUpload}>Test Image Upload</button>
            </div>
        )
    }

    render() {
        let componentToRender;

        if (this.state.showCommunityCreator) {
            componentToRender = <CommunityCreator userData={this.props.userData} />;
        } else if (this.state.showTestImageUpload) {
            componentToRender = <ProfileImageUpload userData={this.props.userData} />;
        } else {
            componentToRender = this.UserDash();
        }

        return (
            <div className="rootUserDashDiv">
                <VertNavBar userData={this.props.userData} />
                <div className="userDash">
                    {componentToRender}
                    <Chat userData={this.props.userData.uid} />
                </div>
            </div>
        );
    }
}
export default userDashboard;