import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import ScrollToTop from "./components/ScrollToTop";
import LogRocket from "logrocket";
import SendEmailForm from "./components/SendEmailForm";
LogRocket.init("xjizyw/qode");
function App() {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <SendEmailForm />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
