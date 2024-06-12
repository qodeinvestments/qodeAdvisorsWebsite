import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="bg-[#F1F4F8]">
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
