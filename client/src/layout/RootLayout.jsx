import Footer from "../components/shared/footer/Footer";
import NavBar from "../components/shared/navBar/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <NavBar />
      <div className="lg:py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
