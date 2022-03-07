import React from "react";

class communityCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="communityCreator">
               <h2> Enter Community Information </h2>
                <form action="community information">
                    <label for="communityName">Community Name:</label><br/>
                    <input type="text" id="communityName" name="communityName"> </input>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}
export default communityCreator;