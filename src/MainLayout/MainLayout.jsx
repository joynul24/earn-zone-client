import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navber/Navbar";
import PageLoading from "../components/shared/LoadingAll/PageLoading";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div className="max-w-7xl mx-auto">
      {navigation.state === "loading" ? (
        <PageLoading></PageLoading>
      ) : (
        <>
          <header>
            <Navbar />
          </header>
          <div className="min-h-[calc(100vh-285px)]">
            <Outlet />
          </div>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
};

export default MainLayout;
