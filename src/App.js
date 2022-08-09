import { Outlet } from "react-router-dom";
import "./App.scss";
import SideBar from "./components/sideBar";
import Header from "./components/header";
import { useEffect } from "react";

const userData = {
  id: 123,
  firstName: "JOHN",
  middleName: null,
  lastName: "SMITH",
  role: "STUDENT",
  email: "JOHNSMITH@GMAIL.COM",
  phoneNumber: "9848022338",
  password: "John@2338",
  isActive: "Y",
  lastUpdatedDate: "29-07-2022",
  message: null,
};
function App() {
  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }, []);
  return (
    <div className="mainContainer">
      <SideBar />
      <div className="rightContent">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
