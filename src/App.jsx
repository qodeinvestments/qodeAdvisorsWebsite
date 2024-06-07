import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

function App() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
