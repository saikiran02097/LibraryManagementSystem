import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/login";
import Dashboard from "./components/dashboard";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import App from "./App";
import UserManagement from "./components/dashboard/userManagement";
import BookManagement from "./components/dashboard/bookManagement";
import IssueBook from "./components/dashboard/issueBook";
import CollectBook from "./components/dashboard/collectBook";
import StudentDashboard from './components/studentDashboard';
import SearchBooks from './components/studentDashboard/Searchbooks';
import IssuedBooks from "./components/studentDashboard/issuedBooks";
import { Context } from "./appContext/wrapper";

const NotFound = () => <div>route not defined</div>;

const AuthRoute = ({ Component }) => {
    const [data] = useContext(Context);
    return data.isAuth ? <Component /> : <Navigate to={"/login"} />
};


function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<AuthRoute Component={App} />} >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/manageusers" element={<UserManagement />} />
                    <Route path="/managebooks" element={<BookManagement />} />
                    <Route path="/issuebook" element={<IssueBook />} />
                    <Route path="/collectbooks" element={<CollectBook />} />
                    <Route path="/studentdashboard" element={<StudentDashboard />} />
                    <Route path="/searchbooks" element={<SearchBooks />} />
                    <Route path="/issuedbooks" element={<IssuedBooks />} />
                    <Route path="/bookhistory" element={<IssuedBooks type="collected" />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;
