import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Deposit from "./pages/Deposit";
import FormDeposit from "./pages/FormDeposit";
import HomePage from "./pages/Home";
import SimpleCrud from "./pages/SimpleCurd";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simple-crud" element={<SimpleCrud />} />
          <Route path="/form-deposit" element={<FormDeposit />} />
          <Route path="/deposit" element={<Deposit />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
