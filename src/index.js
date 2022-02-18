import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Import Main App
import App from "./App";
import UserDashboard from "./Views/UserDashboard.js";

// Redux
import store from './store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById("root");
render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    rootElement
);