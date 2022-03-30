import React from "react";
import axios from "axios";
import './../Assets/communityDash.css';
import Chat from "../Components/Chat";
import Calendar from "../Components/Calendar";
import Announcements from "../Components/Announcements";

class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                CommunityID: undefined,
                CommunityName: undefined,
                LogoID: undefined,
                HeaderID: undefined,
                CommunityDescription: undefined,
                CommunityJoinCode: undefined,
                PrimaryColor: undefined,
                SecondaryColor: undefined,
            },
            isLoading: true,
            showProfileEdit: false
        }

        this.openProfileEdit = this.openProfileEdit.bind(this);
        this.closeProfileEdit = this.closeProfileEdit.bind(this);
    }

    async componentDidMount() {
        // Make API to get Community Data
        axios.post(('/getCommunityData'), {
            communityID: this.props.communityID,
        }).then((response) => {
            this.setState({community: response.data[0]}, function() {
                this.setState({isLoading: false})
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    openProfileEdit() {
        // Get the modal
        let modal = document.getElementById("profileModal");

        modal.style.display = "block";
    }

    closeProfileEdit() {
        // Get the modal
        let modal = document.getElementById("profileModal");

        modal.style.display = "none";
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="communityDash">
                <div className="communityHeader">
                    <div className="communityNav">
                        <a><p>Admin Dashboard</p></a>
                        <a onClick={this.openProfileEdit}><img className="profilePic" src={this.props.userData.profileImgID} /></a>
                    </div>
                    <img src="https://cmshelpfiles.com/sites/support/uploads/images/tools_resources/image_ratios/horizontal-landscape.jpg" alt="Community Header" />
                    <div className="communityInfo">
                        <h2>{this.state.community.CommunityName}</h2>
                        <p>X Members</p>
                    </div>
                </div>
                <div className="communityDashContent">
                    <Calendar communityID={this.state.community.CommunityID } />
                    <Chat userData={this.props.userData.uid} communityData={this.state.community} />
                    <Announcements communityID={this.state.community.CommunityID } />
                </div>

                <div id="profileModal" className="modal">

                    <div className="modal-content">
                        <a onClick={this.closeProfileEdit}><span className="close">&times;</span></a>
                        <p>Some text in the Modal..</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default CommunityDashboard;