import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
// import Register from "./components/Register";
// import Reset from "./components/Reset";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          {/* <Route exact path="/reset" element={<Reset />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;