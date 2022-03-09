import '../App.css';
import CommunityCreator from "../Views/CommunityCreator";
import UserDashboard from "../Views/UserDashboard";
import communityCreator from "../Views/CommunityCreator";

const CreateCommunity = () => {
    function createCommunity () {
        return <communityCreator />;
      }

    return (
        <div>
            <button className="button" onClick={createCommunity}><i className=""></i>Create Community</button>
        </div>
        //what exactly is the class name?
    )
}

export default CreateCommunity;