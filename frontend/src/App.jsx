import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import ScrollToTop from "./components/ScrollToTop";
import LogRocket from "logrocket";
LogRocket.init("xjizyw/qode");
function App() {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
