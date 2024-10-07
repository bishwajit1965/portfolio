import Footer from "../components/shared/footer/Footer";
import NavBar from "../components/shared/navBar/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <div className="lg:max-w-7xl mx-auto shadow-md">
        <NavBar />
        <div className="lg:my-10">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
