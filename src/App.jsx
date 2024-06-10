import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

function App() {
  return (
    <div className="bg-[#F1F4F8]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
