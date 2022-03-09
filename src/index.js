import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Import Main App
import App from "./App";
import UserDashboard from "./Views/UserDashboard.js";
import CommunityCreator from  "./Views/CommunityCreator";

// Redux
import store from './store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById("root");
render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/createCommunity" element={<CommunityCreator />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    rootElement
);