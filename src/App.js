import { useState, useEffect } from 'react';

// Components
import Login from './Components/Login';
import CommunitySelect from './Components/CommunitySelect';

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
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Auth
        firebase.auth().onAuthStateChanged(async user => {
            await setUser(user);
            if (user) {
                // If User Load Data for Database
                axios.post(('http://localhost:8900/getUserData'), {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName, //temp
                    firstName: null,
                    lastName: null,
                    profileImgID: null,
                }).then(function (response) {
                    //console.log(response.data[0]);
                }).catch(function (error) {
                        console.log(error);
                    });

                // Format Data
                let tempData = {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName, //temp
                    firstName: null,
                    lastName: null,
                    profileImgID: null,
                    communities: []
                }

                //Get User Community Data
                axios.post(('http://localhost:8900/getUserCommunityData'), {
                    uid: user.uid,
                    communities: [],
                }).then(function (response) {
                    tempData.communities = response.data;
                    setUserData(tempData);
                    setLoading(false);
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                isLoading(false);
            }
        })



    }, [])

    if (isLoading && user) {
        return <div>
            <h2>Loading...</h2>
        </div>
    }

    // If User Signed in Display Correct View
    if (user) {
        /* Needs to wait for getUserCommunityData to be done */
        return <UserDashboard userData={userData}/>;
    }
    // If not signed in this is what renders
    return (
        <div className="app">
            <h1>IfyIfy</h1>
            <Login/>
        </div>
    );
}

export default App;
