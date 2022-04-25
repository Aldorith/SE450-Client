import React from "react";
import VertNavBar from "../Components/VertNavBar";
import CommunityDashboard from "./CommunityDashboard";

// Style
import '../Assets/userDash.css';
import CommunitySelect from "../Components/CommunitySelect";
import CommunityCreator from "./CommunityCreator";

class userDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToRender: null,
            communitySideBar: <div id="helper"></div>,
            sideBarHash: Date.now()
        }

        this.switchCommunity = this.switchCommunity.bind(this);
        this.loadCommunityCreator = this.loadCommunityCreator.bind(this);
        this.handleCommunitySideBar = this.handleCommunitySideBar.bind(this);
    }

    componentDidMount() {
        let component = null;

        // If not a member of any communities
        if (this.props.userData.communities.length === 0) {
            component =
                <CommunitySelect
                    loadCreateCommunity={this.loadCommunityCreator}
                    loadCommunity={this.loadCommunity}
                    userData={this.props.userData}
                    switchCommunity={this.switchCommunity}
                />;
        } else {
            console.log("Loading Community: #" + this.props.userData.communities[0].CommunityID);
            component = <CommunityDashboard
                userData={this.props.userData}
                communityID={this.props.userData.communities[0].CommunityID}
                isAdmin={this.props.userData.communities[0].AdminTrue}
                updateSide={this.handleCommunitySideBar} />;
        }

        // Update State
        this.setState({componentToRender: component});
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    // Handle Vert Nav Side Bar Data
    handleCommunitySideBar(component) {
        this.setState({
            communitySideBar: component,
            sideBarHash: Date.now()
        });
    }

    // Switch Community
    switchCommunity(CommunityID) {
        console.log("Trying to Load Community #" + CommunityID);
        let admin = false;

        for (let i = 0; i < this.props.userData.communities.length; i++) {
            if (this.props.userData.communities[i].CommunityID === CommunityID) {
                admin = this.props.userData.communities[i].AdminTrue;
                break;
            }
        }

        // Get CommunityDashboard Component
        let component = <CommunityDashboard key={CommunityID} userData={this.props.userData} communityID={CommunityID} updateSide={this.handleCommunitySideBar} isAdmin={admin} />;

        // Update State
        this.setState(state => ({
            componentToRender: component,
            sideBarHash: Date.now()
        }));

    }

    // Load Community Creator
    loadCommunityCreator() {
        let component = <CommunityCreator userData={this.props.userData} switchCommunity={this.switchCommunity}/>;
        this.setState({componentToRender: component});
    }

    render() {
        return (
            <div className="rootUserDashDiv">
                <VertNavBar
                    userData={this.props.userData}
                    switchCommunity={this.switchCommunity}
                    communitySideBar={this.state.communitySideBar}
                    key={this.state.sideBarHash}
                />
                <div className="userDash">
                    {this.state.componentToRender}
                </div>
            </div>
        );
    }
}
export default userDashboard;