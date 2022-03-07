import { useState, useEffect } from 'react';

// Components
import Login from './Components/Login';

// Firebase
import firebase from './firebase';
import 'firebase/auth';


// Assets
import './App.css';
import axios from "axios";

// Views
import UserDashboard from "./Views/UserDashboard";

function App() {
    const [user, setUser] = useState(null);
    let userData = null;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        })
    }, [])



    // If User Signed in Display Correct View
    if (user) {
        // If User Load Data for Database
        if (user) {
            // Make API call to web server
            axios.post(('http://localhost:8900/getUserData'), {
                uid: user.uid,
                email: user.email,
                username: user.displayName, //temp
                firstName: null,
                lastName: null,
                profileImgID: null,
            })
                .then(function (response) {
                    console.log(response.data[0]);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        // Format Data
        userData = {
            uid: user.uid,
            email: user.email,
            username: user.displayName, //temp
            firstName: null,
            lastName: null,
            profileImgID: null,
            communities: []
        }

        if(userData.communities.length)
            return <UserDashboard userData={userData}/>;
        else
            return <UserDashboard userData={userData}/>;
    }

    // If not signed in this is what renders
    return (
        <div className="app">
            <h1>IfyIf</h1>
            <Login />
        </div>
    );
}

export default App;
