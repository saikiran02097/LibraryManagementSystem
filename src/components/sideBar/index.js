import React from 'react';
import { Link } from "react-router-dom";
import './sideBar.scss';
import LOGO from "../../assets/logo.jpg";

const routes = [
    {
        path: "/dashboard",
        iconClass: "fa-solid fa-book",
        name: "Dashboard"
    },
    {
        path: "/profile",
        iconClass: "fa-solid fa-user",
        name: "Profile"
    },
    {
        path: "/logout",
        iconClass: "fa-solid fa-right-from-bracket",
        name: "Logout"
    }
]

const sideBar = () => {
    return (
        <div className='leftContent'>
            <div >
                <img src={LOGO} alt="Logo" className="logo"/>
            </div>
            <ul className='menuContainer'>
                {
                    routes.map(({ path, iconClass, name }, key) => (<li className='menuItem' key={key}>
                        <Link className='routeLink' to={path}>
                            <i className={iconClass}></i>
                            <div>{name}</div>
                        </Link>
                    </li>))
                }
                {/* <li className='menuItem'>
                    <Link className='routeLink activeLink' to="/dashboard">
                        <i className="fa-solid fa-book"></i>
                        <div>Dashboard</div>
                    </Link>
                </li>
                <li className='menuItem'>
                    <Link className='routeLink' to="/register">
                        <i className="fa-solid fa-user-plus"></i>
                        <div>Register</div>
                    </Link>
                </li>
                <li className='menuItem'>
                    <Link className='routeLink' to="/account">
                        <i className="fa-solid fa-user"></i>
                        <div>Account</div>
                    </Link>
                </li> */}
            </ul>
        </div>
    )
}

export default sideBar