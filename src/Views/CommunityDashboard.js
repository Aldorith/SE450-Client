import React from "react";
import axios from "axios";
import './../Assets/communityDash.css';

class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                CommunityID: undefined,
                CommunityName: undefined,
                LogoID: undefined,
                HeaderID: undefined,
                communityDescription: undefined,
                communityJoinCode: undefined,
                primaryColor: undefined,
                secondaryColor: undefined,
            }
        }
    }

    componentDidMount() {
        // Make API to get Community Data
        axios.post(('http://localhost:8900/getCommunityData'), {
            communityID: this.props.communityID,
        }).then((response) => {
            console.log(response.data[0]);
            this.setState({community: response.data[0]});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="communityDash">
                <div className="communityHeader">
                    <img src="https://cmshelpfiles.com/sites/support/uploads/images/tools_resources/image_ratios/horizontal-landscape.jpg" />
                    <div className="communityInfo">
                        <h2>{this.state.community.CommunityName}</h2>
                        <p>X Members</p>
                    </div>
                </div>
                <div className="communityDash">

                </div>
            </div>
        )
    }
}

export default CommunityDashboard;