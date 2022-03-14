import React from "react";
import LogOut from "../Components/LogOut";
import CommunityCreator from "./CommunityCreator";
import VertNavBar from "../Components/VertNavBar";
import Calendar from "../Components/Calendar";
import ProfileImageUpload from "../Components/ImageUpload/ProfileImageUpload";
import CommunityDashboard from "./CommunityDashboard";
//import AdminDashboard from "./AdminDashboard";

// Style
import '../Assets/userDash.css';


class userDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommunityCreator: false,
            showCalendar: false,
            showEventCreator: false,
            showTestImageUpload: false,
            currentCommunity: 1, // This is a test - switch to undefined at a later point
            showCommunity: false,
            showTestAdmin: false
        }

        this.loadCommunityCreator = this.loadCommunityCreator.bind(this);
        this.loadCalendar = this.loadCalendar.bind(this);
        this.loadEventCreator= this.loadEventCreator.bind(this);
        this.showTestImageUpload = this.showTestImageUpload.bind(this);
        this.loadCommunity = this.loadCommunity.bind(this);
        this.loadTestDash = this.loadTestDash.bind(this);
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

    loadCommunity () {
        this.setState({showCommunity: true});
    }

    loadTestDash() {
        this.setState({showTestAdmin: true})
    }

    UserDash (props) {
        return (
            <div class="userDashContent">
                <h2>User Dashboard</h2>
                <p>{this.props.userData.username}</p>
                <LogOut />

                <br/> <br/>
                <button onClick={this.loadCommunityCreator}>Create Community</button>
                <br/> <br/>
                <button onClick={this.showTestImageUpload}>Test Image Upload</button>
                <br/> <br/>
                <button onClick={this.loadCommunity}>Load Test Community</button>
                <br/> <br/>
                <button onClick={this.loadTestDash}>Load Test Admin Page</button>
            </div>
        )
    }

    render() {
        let componentToRender;

        if (this.state.showCommunityCreator) {
            componentToRender = <CommunityCreator userData={this.props.userData} />;
        } else if (this.state.showTestImageUpload) {
            componentToRender = <ProfileImageUpload userData={this.props.userData} />;
        } else if (this.state.showCommunity) {
            componentToRender = <CommunityDashboard userData={this.props.userData} communityID={this.state.currentCommunity} />
        }  else if (this.state.showTestAdmin) {
            //componentToRender = <AdminDashboard />
        }
        else {
            componentToRender = this.UserDash();
        }
        //                    <Chat userData={this.props.userData.uid} />

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