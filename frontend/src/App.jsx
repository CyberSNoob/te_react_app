import "./styles/App.css";
import Footer from "./components/nav/Footer";
import Navbar from "./components/nav/Navbar";
import Router from "./components/Router";

const Banner = () => (
  <div className="text-white bg-red-500 font-medium text-xl flex justify-center uppercase">
    <p>Example app</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
