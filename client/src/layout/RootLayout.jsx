import Footer from "../components/shared/footer/Footer";
import NavBar from "../components/shared/navBar/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <div className="w-full mx-auto sticky top-0 z-50">
        <NavBar />
      </div>
      <main className="">
        <div className="lg:max-w-full mx-auto">
          <Outlet />
        </div>
      </main>
      <div className="w-full lg:mt-4 mt-0">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
