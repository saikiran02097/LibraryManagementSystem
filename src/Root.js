import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import Dashboard from "./components/dashboard";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import App from "./App";
import UserManagement from "./components/dashboard/userManagement";
import BookManagement from "./components/dashboard/bookManagement";

const NotFound = () => <div>route not defined</div>

function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<App />} >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/manageusers" element={<UserManagement />} />
                    <Route path="/managebooks" element={<BookManagement />} />
                    <Route path="/issuebook" element={<NotFound />} />
                    <Route path="/collectbooks" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;
