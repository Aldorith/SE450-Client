import React from "react";
import axios from "axios";

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
                <form>
                    <label> Community Name: <input type="text" name="CommunityName" /></label>
                    <label> Community Description: <input type="text" name="CommunityDescription" /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
        axios.post(('http://localhost:8900/getUserData'), {
            communityID: community.ID,
            communityDesc: community.Desc
        });
    }
}
export default CommunityCreator;