import '../App.css';
import communityCreator from "../Views/CommunityCreator";

const ToCommunityCreator = () => {
    function toCommunityCreator () {
        return <communityCreator />;
      }

    return (
        <div>
            <button className="button" onClick={toCommunityCreator}><i className="toCommunityCreator"></i>Create a Community</button>
        </div>
        //what exactly is the class name?
    )
}

export default ToCommunityCreator;