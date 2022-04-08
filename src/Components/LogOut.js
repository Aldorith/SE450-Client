import '../App.css';
import { getAuth, signOut } from "firebase/auth";

const LogOut = () => {
    function logOut () {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });    }

    return (
        <div className="logOutButton">
            <button onClick={logOut}>Sign Out</button>
        </div>
    )
}

export default LogOut;