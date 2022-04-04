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
            components: {
                showCommunityCreator: false,
                showTestImageUpload: false,
                currentCommunity: undefined,
                showCommunity: false,
                showTestAdmin: false,
            },
            componentToRender: null,
        }

        this.switchCommunity = this.switchCommunity.bind(this);
        this.loadCommunityCreator = this.loadCommunityCreator.bind(this);
    }

    loadCommunityCreator() {
        let component = <CommunityCreator userData={this.props.userData} />;
        this.setState({componentToRender: component});
    }

    componentDidMount() {
        let component = null;

        // If not a member of any communities
        if (this.props.userData.communities.length === 0) {
            component =
                <CommunitySelect loadCreateCommunity={this.loadCommunityCreator} loadCommunity={this.loadCommunity}
                                 userData={this.props.userData}/>;
        } else {
            console.log("Loading Community: #" + this.props.userData.communities[0].CommunityID);
            component = <CommunityDashboard userData={this.props.userData} communityID={this.props.userData.communities[0].CommunityID} />;
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

    // Switch Community
    switchCommunity(CommunityID) {
        console.log("Trying to Load Community #" + CommunityID);

        // Get CommunityDashboard Component
        let component = <CommunityDashboard key={CommunityID} userData={this.props.userData} communityID={CommunityID} />;

        // Update State
        this.setState(state => ({
            componentToRender: component
        }));

    }

    render() {
        return (
            <div className="rootUserDashDiv">
                <VertNavBar userData={this.props.userData} switchCommunity={this.switchCommunity} />
                <div className="userDash">
                    {this.state.componentToRender}
                </div>
            </div>
        );
    }
}
export default userDashboard;