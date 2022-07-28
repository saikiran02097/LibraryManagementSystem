import { Outlet } from "react-router-dom";
import './App.scss';
import SideBar from "./components/sideBar";
import Header from "./components/header"

function App() {
  return (
    <div className='mainContainer'>
      <SideBar />
      <div className='rightContent'>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
