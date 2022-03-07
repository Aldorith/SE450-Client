import '../App.css';



function CommunityButtonList(userData) {
    const communities = userData.communities;
    const communityList = communities.map((communities) =>
        <button type="button">{communities}</button>
    );
}

ReactDOM.render(
    <CommunityButtonList communities = {communities} />>
)
return <div>
<h1>Current Communities</h1><br/>
</div>