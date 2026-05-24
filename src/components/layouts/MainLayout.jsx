import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import MainHeader from "../headers/main-header/MainHeader";
import "./mainLayout.scss";

const MainLayout = () => {
  document.body.style.backgroundColor = "#0f0f0f";

  return (
    <div>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
