import { useState, useEffect } from 'react';

// Components
import Login from './Components/Login';

// Firebase
import firebase from './firebase';
import 'firebase/auth';


// Assets
import './App.css';
import axios from "axios";

// Components
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
            axios.post((process.env.SERVER_ADDRESS +'/getUserData'), {
                uid: user.uid
            })
                .then(function (response) {
                    console.log(response);
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
            profileImgID: null
        }

        return <UserDashboard userData={userData}/>;
    }

    // If not signed in this is what renders
    return (
        <div className="app">
            <h1>IfyIfy</h1>
            <Login />
        </div>
    );
}

export default App;
