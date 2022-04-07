import React from "react";
import '../Assets/leftNav.css';
import axios from "axios";
import Modal from 'react-modal';
import addIcon from "../Assets/images/plusSign.svg";
import CommunityCreator from "../Views/CommunityCreator";

class VertNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communityJoinCode: '',
            errorMessage: '',
            showModal: false
        }

        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.joinCommunity = this.joinCommunity.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    joinCommunity(event){
        let that = this;
        //Have User Join Community
        // Make API call to web server
        axios.post(('/userJoinCommunity'), {
            uid: this.props.userData.uid,
            communityJoinCode: this.state.communityJoinCode,
        }).then(function (response) {
            console.log(response.data);
            if(response.data.length >= 1) {
                that.setErrorMessage('');
                that.props.loadCommunity(response.data[0].CommunityID);
            }
            else
            {
                that.setErrorMessage('Invalid Join Code: Try again!');
            }
        })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    render() {

        return (
            <div className="vertNavBar">
                <div className="logoBlock">
                    <h2>IfyIfy</h2>
                </div>
                <div className="twoSides">
                    <div className="listOfCommunities">
                        <ul>
                            {this.props.userData.communities.map((community) =>
                                <li key={community.CommunityID.toString()}>
                                    <a onClick={() => this.props.switchCommunity(community.CommunityID)}>
                                        <img src={'/communityIcons/'+community.CommunityID+'.png'} alt={community.CommunityName + " Logo"}/>
                                    </a>
                                </li>
                            )}
                            <li>
                                <a onClick={this.handleOpenModal}>
                                    <img src={addIcon} alt={"Join Community"} className="icon"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="options">
                        <p>> Home Page</p>
                        <p>> User Directory</p>
                        <p>> Admin Dashboard</p>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Join Community"
                    style="addOrJoinModal"
                >
                    <div>
                        <h4>Join Community</h4>
                        <form onSubmit={this.joinCommunity}>
                            <input type="text" value={this.state.communityJoinCode} name="communityJoinCode" placeholder={"Join Code"} onChange={this.handleChange}/>
                            <input type="submit" value="Join" />
                            {this.state.errorMessage && (
                                <p className="error"> {this.state.errorMessage}</p>
                            )}
                        </form>
                    </div>
                    <div>
                        <h4>Create Community</h4>
                        <CommunityCreator userData={this.props.userData}/>
                    </div>

                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </Modal>
            </div>
        )
    }
}

export default VertNavBar;