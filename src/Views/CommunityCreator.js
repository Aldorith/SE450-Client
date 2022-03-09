import React from "react";

class CommunityCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state({
            x: false
        })
    }

    communityInformation (e) {
        e.preventDefault(); // This prevents the page from refreshing

        this.setState({x:true});
    }

    render() {
        return (
            <div className="communityCreator">
               <h2> Enter Community Information </h2>
                <form onSubmit={this.communityInformation}>
                    <label for="communityName">Community Name:</label><br/>
                    {this.state.x &&
                    <h2>
                        Error Message
                    </h2>
                    }
                    <input type="text" id="communityName" name="communityName"> </input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default CommunityCreator;